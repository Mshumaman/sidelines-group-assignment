import BasePage from "./BasePage";
import {Page} from "@playwright/test";

export default class PageSpeedMainPage extends BasePage {

    constructor(protected page: Page) {
        super(page);
    }

    private searchBar = this.page.locator('[placeholder="Enter a web page URL"]');
    private analyzeButton = this.page.getByRole('button', {name: 'Analyze'});
    private seoLabel = this.page.getByRole('heading', {name: 'SEO'}).locator('a');
    private accessibilityLabel = this.page.getByRole('heading', {name: 'Accessibility'}).locator('a');
    private performanceLabel = this.page.getByLabel('smartphoneMobile').locator('#performance').getByText('Performance', {exact: true});
    private bestPracticesLabel = this.page.getByRole('heading', {name: 'Best Practices'}).locator('a');


    public async analyzeReport(url: string) {
        await this.searchBar.fill(url);
        await this.analyzeButton.click();
        await this.seoLabel.waitFor({timeout: 120000});
    }

    public async validateMetricsIsVisible() {
        await this.validateElementIsVisible(this.performanceLabel)
        await this.validateElementIsVisible(this.accessibilityLabel)
        await this.validateElementIsVisible(this.bestPracticesLabel)
        await this.validateElementIsVisible(this.seoLabel)

    }
}