import {test as base} from '@playwright/test';
import BasePage from "../pages/BasePage";
import PageSpeedMainPage from "../pages/PageSpeedMainPage";

type Fixtures = {
    basePage: BasePage;
    pageSpeedMainPage : PageSpeedMainPage;

}

export const test = base.extend<Fixtures>({

    basePage: async ({page}, use) => {
        await use(new BasePage(page));
    },
    pageSpeedMainPage: async ({page}, use) => {
        await use(new PageSpeedMainPage(page));
    },
});
