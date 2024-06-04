pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
        stage('Generate Cucumber Report') {
            steps {
                sh 'npx cucumber-js --format json:test-results/results.json'
            }
        }
    }
    post {
        always {
            cucumber reports: 'test-results/results.json'
            xrayImportResults(
                serverAddress: 'https://saicharan21.atlassian.net/projects/DEMO',
                clientId: 'A62384A06D324EAE8A57846373BF0283',
                clientSecret: '388e15e1e32f670d0b3847698e15ada5f873df6798db84a0b3e7d3bf7c47ead8',
                resultPath: 'test-results/results.json'
            )
        }
    }
}
