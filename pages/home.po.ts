import { Page, expect, Locator } from '@playwright/test';

const currentTime = new Date().getTime();

export class HomePage {
  userNameInput: Locator;
  passwordInput: Locator;
  loginBtn: Locator;
  paymentsIcon: Locator;
  transfers: Locator;
  beneficiary: Locator;
  createBtn: Locator;

  constructor(private page: Page) {
    this.userNameInput = this.page.locator("#userName");
    this.passwordInput = this.page.locator("#password");
    this.loginBtn = this.page.locator('button[type="submit"]').nth(1);
    this.paymentsIcon = this.page.locator('.isCorporatePaysSidenavIcon');
    this.transfers = this.page.locator('a:has(.label:has-text("Transfers"))').nth(0);
    this.beneficiary = this.page.locator('a:has(.label:has-text("Beneficiary accounts"))').nth(0);
    this.createBtn = this.page.locator('.createBtn').nth(0);
  }

  async verifyLoginPage() {
    await this.page.waitForSelector("text=Authorised User Access", { timeout: 60000 });
    await expect(this.page.locator("text=Authorised User Access")).toBeVisible();
  }
  
  async enterUsername(username: string) {
    await this.userNameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginBtn.click();
  }

  async verifyHomePage() {
    await this.page.waitForSelector('.isCorporatePaysSidenavIcon', { timeout: 60000 });
    await expect(this.paymentsIcon).toBeVisible();
    await expect(this.page).toHaveURL('https://uat.onesingleview.com/overview_classic');
  }

  async navigateToPaymentsTab() {
    await this.page.waitForSelector('.isCorporatePaysSidenavIcon', { timeout: 60000 });
    await this.paymentsIcon.click();
  }

  async verifyPaymentTab() {
    await expect(this.page).toHaveURL('https://uat.onesingleview.com/payments/summary');
    await expect(this.page.locator('text=Pending actions summary')).toBeVisible({ timeout: 60000 });
  }

  async clickOnTransfer() {
    await this.transfers.click();
  }

  async verifyTransfer() {
    await expect(this.page).toHaveURL('https://uat.onesingleview.com/payments/transfers');
  }

  async clickOnBeneficiary() {
    await this.beneficiary.click();
  }

  async verifyBeneficiary() {
    await expect(this.page.locator('text=Beneficiary accounts')).toBeVisible({ timeout: 60000 });
  }

  async clickOnCreatePayment() {
    await this.createBtn.click();
  }

  async verifyCreatePayment() {
    await expect(this.page.locator('text=Create beneficiary accounts payment')).toBeVisible({ timeout: 60000 });
  }

  async fillPaymentForm() {
    const debitCard = await this.page.locator('text=Debit account');
    await debitCard.click();
    await this.page.waitForSelector('.listOfItems', { state: 'visible', timeout: 60000 });
    const debitOption = await this.page.locator('.inputList .name[title="NCB"]');
    await debitOption.click();

    const beneficiary = await this.page.locator('div:has-text("Beneficiary account")').nth(2);
    await beneficiary.click();
    await this.page.waitForSelector('#react-select-5-input', { timeout: 60000 });
    const beneficiaryValue = this.page.locator("#react-select-5-input");
    await beneficiaryValue.fill("sana");
    await this.page.getByRole('option', { name: 'sana -' }).click();

    await this.page.getByLabel('Amount (SAR)').fill('7');
    await this.page.getByLabel('Amount (SAR)').click();
    await this.page.locator('div:nth-child(5) > .selectOptionFont > .name-select__control > .name-select__value-container > .name-select__input-container').click();
    await this.page.getByRole('option', { name: 'Business:Operating Expenses' }).click();

    await this.page.locator('textarea[type="text"]').fill(`Test ID ${currentTime}`);
  }

  async submitPayment() {
    await this.page.getByRole('button', { name: 'Add to payments' }).click();
  }

  async isPaymentListed() {
    return await this.page.isVisible(`text=Test ID ${currentTime}`);
  }
}
