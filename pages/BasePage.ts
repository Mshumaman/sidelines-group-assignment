import {expect, Locator, Page, test} from "@playwright/test";
import {AppConfig} from "../config/AppConfig";

export default class BasePage {

    constructor(protected page: Page) {
    }

    public async loadApplication(url: string = AppConfig.BASE_URL) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    public async validateElementIsVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

}