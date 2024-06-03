import { Given, When, Then , setDefaultTimeout} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, Page, chromium  } from "@playwright/test"
import { HomePage } from '../../../pages/home.po';
let homePage: HomePage;
let page: Page
let browser: Browser
setDefaultTimeout(200000); // 20 seconds

Given('User navigates to the application', async function () {
  browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  page = await context.newPage()
  homePage = new HomePage(page)
  await page.goto('https://uat.onesingleview.com/login', { timeout: 60000 }); 
  await homePage.verifyLoginPage();

});

Given('User log in with {string} and {string}', async (username: string, password: string)=> {
  await homePage.enterUsername(username);
  await homePage.enterPassword(password);
  await homePage.clickLogin();
  await homePage.verifyHomePage();
});

When('User navigates to the payments tab', async () => {
  await homePage.navigateToPaymentsTab();
  await homePage.verifyPaymentTab();

});

When('User clicks on the transfer sub-nav item', async () => {
  await homePage.clickOnTransfer();
  await homePage.verifyTransfer();
});

When('User clicks on the beneficiary sub-nav item', async () => {
  await homePage.clickOnBeneficiary();
  await homePage.verifyBeneficiary();
});

When('User clicks on create', async ()=> {
  await homePage.clickOnCreatePayment();
  await homePage.verifyCreatePayment();
});

When('User fills the payment form with valid details', async function () {
  await homePage.fillPaymentForm();
});

When('User submits the payment', async function () {
  await homePage.submitPayment();
});


Then('The payment should be listed in the payments page', async function () {
  const isListed = await homePage.isPaymentListed();
  expect(isListed).toBe(true);
  browser.close();
});
