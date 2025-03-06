import {test} from "../fixtures/Fixtures";

test.describe('Website Analysis and Validation Task', () => {

    const siteURL = 'https://www.cbssports.com/betting/'

    test(`should search and validate performance of ${siteURL} from PageSpeed Insights UI`, async ({basePage ,pageSpeedMainPage}) => {

        await test.step('open the PageSpeed Insights', async () => {
            await basePage.loadApplication();
        });

        await test.step(`generate report for ${siteURL}`, async () => {
            await pageSpeedMainPage.analyzeReport(siteURL)
        });

        await test.step('validate metrics are visible', async () => {
            await pageSpeedMainPage.validateMetricsIsVisible();
        });
    });
});