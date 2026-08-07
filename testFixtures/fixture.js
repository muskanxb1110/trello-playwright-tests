import { test as base } from '@playwright/test'
import fs from 'fs' 
import LoginPage from '../pages/loginPage.js'
import BoardPage from '../pages/boardPage.js'

const testData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))

const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page, testData))
    },
    boardPage: async ({ page }, use) => {
        await use(new BoardPage(page, testData))
    }
})

export { test } 