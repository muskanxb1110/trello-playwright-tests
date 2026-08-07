import { expect } from '@playwright/test'
import {
    createBoardButtonStepOne,
    createBoardTitle,
    createBoardButtonStepTwo,
    createBoardButtonStepThree,
    boardTile,
    clickHorizontalThreeDotsTestBoard,
    closeBoardButton,
    redCloseBoardButtonPopup,
    permanentDeleteBoardButton,
    redDeleteBoardConfirmButtonPopup,
    createListButton,
    addListName,
    addListButton,
    listNameonBoard,
    addCardButtonInToDoList,
    addCardTextBoxInToDoList,
    addCardButtonFinalInToDoList,
    cardNameonBoard
} from '../pageobjects/boardPage.js'

class BoardPage {
    constructor(page, testData) {
        this.page = page
        this.testData = testData
    }

    async openApp() {
        await this.page.goto(`https://trello.com/u/${this.testData.trelloUsername}/boards`)
        await this.page.waitForSelector(createBoardButtonStepOne)
    }

    async clickCreateBoardButtonOne() {
        await this.page.click(createBoardButtonStepOne)
    }

    async clickCreateBoardButtonTwo() {
        await this.page.click(createBoardButtonStepTwo)
    }

    async enterBoardTitle() {
        await this.page.fill(createBoardTitle, this.testData.boardTitle)
    }

    async createBoardButtonThree() {
        await this.page.click(createBoardButtonStepThree)
    }

    async waitForBoardPage() {
        await this.page.waitForURL('**/b/**')
    }

    async getUrl() {
        return this.page.url()
    }

    async clickBoardTile() {
        await this.page.waitForSelector(boardTile)
        await this.page.click(boardTile)
    }

    async waitForHomePage() {
        await this.page.waitForURL('**/u/**')
    }

    async createListonBoardPage() {
        await this.page.click(createListButton);
        await this.page.waitForSelector(addListName);
        await this.page.fill(addListName, this.testData.listName);
        await this.page.click(addListButton);
    }

    async confirmListonBoardPage() {
        await expect(this.page.locator(listNameonBoard, { hasText: this.testData.listName })).toBeVisible();
    }

    async createCardonBoardPage() {
        await this.page.click(addCardButtonInToDoList);
        await this.page.waitForSelector(addCardTextBoxInToDoList);
        await this.page.fill(addCardTextBoxInToDoList, this.testData.cardName);
        await this.page.click(addCardButtonFinalInToDoList);
    }

    async confirmCardonBoardPage() {
        await expect(this.page.locator(cardNameonBoard, { hasText: this.testData.cardName })).toBeVisible();
    }

    async clickThreeDotsMenu() {
        await this.page.click(clickHorizontalThreeDotsTestBoard);
    }

    async closeBoard() {
        await this.page.waitForSelector(closeBoardButton);
        await this.page.click(closeBoardButton);
    }

    async confirmCloseBoard() {
        await this.page.waitForSelector(redCloseBoardButtonPopup);
        await this.page.click(redCloseBoardButtonPopup);
    }

    async permanentDeleteBoard() {
        await this.page.waitForSelector(permanentDeleteBoardButton);
        await this.page.click(permanentDeleteBoardButton);
    }

    async confirmPermanentDeleteBoard() {
        await this.page.waitForSelector(redDeleteBoardConfirmButtonPopup);
        await this.page.click(redDeleteBoardConfirmButtonPopup);
    }

    // removes test data after each scenario to keep regression tests independent
    async deleteTestBoard() {
        try {
            await this.clickThreeDotsMenu();
            await this.closeBoard();
            await this.confirmCloseBoard();

            // reopen menu after board is closed
            await this.clickThreeDotsMenu();

            await this.permanentDeleteBoard();
            await this.confirmPermanentDeleteBoard();

            await this.waitForHomePage();

        } catch (error) {
            await this.page.screenshot({ path: 'cleanup-failure.png' });
            console.log("Board cleanup failed:", error.message);
        }
    }

}

export default BoardPage