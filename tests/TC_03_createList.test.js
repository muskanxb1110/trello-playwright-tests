import { test } from "../testFixtures/fixture";
import { expect } from '@playwright/test';

test.describe('@regression: Create a list', () => {
    test.beforeEach(async ({ boardPage }) => {
        await test.step('open trello', async () => {
            await boardPage.openApp();
        })        
        await test.step('confirm user is on home page', async () => {
            expect(await boardPage.getUrl()).toContain('https://trello.com/');
        })
    })

    test('Create a list', async ({ boardPage }) => {
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
        await test.step('create a new list', async () => {
            await boardPage.createListonBoardPage();
        })
        await test.step('confirm list is on board page', async () => {
            await boardPage.confirmListonBoardPage();
        })
    })

    test.afterEach(async ({ boardPage }) => {
        await test.step('cleanup test board', async () => {
            await boardPage.deleteTestBoard();
        })
    })
})