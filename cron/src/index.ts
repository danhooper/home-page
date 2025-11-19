import fs from 'node:fs/promises';
import { RssFeed } from './RssFeed';
import { isConfig } from './Config';
import yaml from 'js-yaml';
import type { IRssFeedWithArticles } from '@dh-home-page/models/RssFeedDto';

export async function main(): Promise<void> {
    const config = yaml.load(await fs.readFile('config/config.yml', 'utf8'));

    if (!isConfig(config)) {
        throw new Error('config.yml config is invalid');
    }

    const feeds = config.feeds.map((f) => new RssFeed(f));

    const results: IRssFeedWithArticles[] = await Promise.all(
        feeds.map(async (feed) => {
            const articles = await feed.getArticles();
            console.log(`Fetched ${feed.title}`);

            return { title: feed.title, articles, websiteUrl: feed.websiteUrl };
        }),
    );

    await fs.writeFile('./feeds.json', JSON.stringify(results));
    console.log('wrote file');
    process.exit();
}

main();
