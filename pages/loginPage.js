import { expect } from '@playwright/test'
import {
    loginButtonInitial,
    usernameField,
    passwordField,
    continueButton,
    loginButton 
} from '../pageobjects/loginPage.js'

class LoginPage {
    constructor(page, testData) {
        this.page = page
        this.testData = testData
    }

    async openApp() {
        await this.page.goto('https://trello.com')
        await this.page.waitForLoadState('domcontentloaded')
    }

    async clickLoginButton() {
        await this.page.click(loginButtonInitial)
    }

    async enterUsername() {
        await this.page.fill(usernameField, this.testData.validUsername)
        await this.page.click(continueButton)
    }

    async enterPassword() {
        await this.page.fill(passwordField, this.testData.validPassword)
        await this.page.click(loginButton)
    }

    async getUrl() {
        return this.page.url()
    }

}

export default LoginPage