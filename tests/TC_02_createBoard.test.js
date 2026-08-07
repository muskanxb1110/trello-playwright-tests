import { test } from "../testFixtures/fixture";
import { expect } from '@playwright/test';

test.describe('@regression: Create Test Board Scenario', () => {
    test.beforeEach(async ({ boardPage }) => {
        await test.step('open trello', async () => {
            await boardPage.openApp();
        })        
        await test.step('confirm user is on home page', async () => {
            expect(await boardPage.getUrl()).toContain('https://trello.com/');
        })
    })

    test('Create a board', async ({ boardPage }) => {
        await test.step('create a new board', async () => {
            await boardPage.clickCreateBoardButtonOne();
        })
        await test.step('click first create board button', async () => {
            await boardPage.clickCreateBoardButtonTwo();
        })
        await test.step('insert board title', async () => {
            await boardPage.enterBoardTitle();
        })
        await test.step('click second create board button', async () => {
            await boardPage.createBoardButtonThree();
        })
        await test.step('confirm user is on board page', async () => {
            await boardPage.waitForBoardPage();
            expect(await boardPage.getUrl()).toContain('https://trello.com/b/');
        })
    })

    test.afterEach(async ({ boardPage }) => {
        await test.step('cleanup test board', async () => {
            await boardPage.deleteTestBoard();
        })
    })
})