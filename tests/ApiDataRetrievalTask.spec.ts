import {expect, test} from "@playwright/test";

interface IPost {
    userId: number;
    title: string;
    body: string;
}

const baseUrl = 'https://jsonplaceholder.typicode.com';

test.describe('API Validation for JSONPlaceholder Posts', () => {

    test('Fetch and validate posts', async ({request}) => {

        await test.step('Send GET request to fetch posts', async () => {
            var response = await request.get(`${baseUrl}/posts`);
            expect(response.status()).toBe(200);
            expect(response.statusText()).toBe('OK');
        });

        let posts: IPost[] = [];
        await test.step('Parse response JSON', async () => {
            const response = await request.get(`${baseUrl}/posts`);
            posts = await response.json();
            console.log(`Fetched ${posts.length} posts`);
        });

        const invalidPosts: IPost[] = [];

        await test.step('Validate each post', async () => {
            posts.forEach(post => {
                if (!post.title?.trim() || !post.body?.trim() || typeof post.userId !== 'number') {
                    invalidPosts.push(post);
                }
            });
        });

        await test.step('Log invalid posts if found', async () => {
            if (invalidPosts.length > 0) {
                console.warn(`Found ${invalidPosts.length} invalid posts`, invalidPosts);
            } else {
                console.log('All posts are valid');
            }
        });

        await test.step('Assert all posts are valid', async () => {
            expect(invalidPosts.length).toBe(0);
        });
    });
});
