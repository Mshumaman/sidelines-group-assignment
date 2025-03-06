import {test, expect, chromium} from '@playwright/test';
import {playAudit} from 'playwright-lighthouse';
import * as fs from 'fs';
import * as path from 'path';

interface LighthouseReport {
    performance: number;
    seo: number;
    accessibility: number;
    'best-practices': number;
}

test('Performance and Resource Validation Test', async () => {
    try {
        const browser = await chromium.launch({
            args: ['--remote-debugging-port=9222']
        });
        const context = await browser.newContext({
            viewport: {width: 1280, height: 720},
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();

        console.log('Running Lighthouse performance test...');
        const lighthouseResult = await playAudit({
            page,
            url: 'https://www.cbssports.com/betting',
            port: 9222,
            thresholds: {
                performance: 0,
                seo: 0,
                accessibility: 0,
                'best-practices': 0
            }
        });

        const scores: LighthouseReport = {
            performance: (lighthouseResult.lhr.categories.performance?.score ?? 0) * 100,
            seo: (lighthouseResult.lhr.categories.seo?.score ?? 0) * 100,
            accessibility: (lighthouseResult.lhr.categories.accessibility?.score ?? 0) * 100,
            'best-practices': (lighthouseResult.lhr.categories['best-practices']?.score ?? 0) * 100
        };

        const reportPath = path.join(process.cwd(), 'lighthouse-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(scores, null, 2));
        console.log(`Lighthouse report saved to ${reportPath}`);

        console.log('\nValidating resources...');
        const resources = await page.evaluate(() => {
            const links = Array.from(document.getElementsByTagName('a')).map(a => a.href);
            const scripts = Array.from(document.getElementsByTagName('script')).map(s => s.src).filter(src => src);
            const styles = Array.from(document.getElementsByTagName('link')).map(l => l.href).filter(href => href);
            const images = Array.from(document.getElementsByTagName('img')).map(img => img.src).filter(src => src);

            return {
                links,
                scripts,
                styles,
                images
            };
        });

        const brokenResources: { type: string; url: string; status: number }[] = [];


        for (const [type, urls] of Object.entries(resources)) {
            for (const url of urls as string[]) {
                try {
                    const response = await fetch(url);
                    if (response.status !== 200) {
                        brokenResources.push({
                            type,
                            url,
                            status: response.status
                        });
                    }
                } catch (error) {
                    brokenResources.push({
                        type,
                        url,
                        status: 0
                    });
                }
            }
        }


        const brokenResourcesPath = path.join(process.cwd(), 'broken-resources.json');
        fs.writeFileSync(brokenResourcesPath, JSON.stringify(brokenResources, null, 2));
        console.log(`Broken resources report saved to ${brokenResourcesPath}`);


        console.log('\nPerformance Scores:');
        console.log(JSON.stringify(scores, null, 2));

        console.log('\nBroken Resources:');
        console.log(JSON.stringify(brokenResources, null, 2));


        expect(scores.performance).toBeGreaterThan(0);
        expect(scores.seo).toBeGreaterThan(0);
        expect(scores.accessibility).toBeGreaterThan(0);
        expect(scores['best-practices']).toBeGreaterThan(0);

    } catch (error) {
        console.error('Error during testing:', error);
        throw error;
    }
}); 