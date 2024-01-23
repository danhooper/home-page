import fs from 'fs/promises';
import { RssFeed } from './RssFeed';
import { type Config } from './Config';
import yaml from 'js-yaml';
import { IRssFeedWithArticles } from '@dh-home-page/models/RssFeedDto';

export async function main(): Promise<void> {
    const doc: Config = yaml.load(await fs.readFile('config/config.yml', 'utf8')) as any;
    const feeds = doc.feeds.map((f) => new RssFeed(f));

    const results: IRssFeedWithArticles[] = await Promise.all(
        feeds.map(async (feed) => {
            const articles = await feed.getArticles();
            console.log(`Fetched ${feed.title}`);

            return { title: feed.title, articles, websiteUrl: feed.websiteUrl };
        }),
    );

    console.log('done fetching results', JSON.stringify(results));
    await fs.writeFile('./feeds.json', JSON.stringify(results));
    console.log('wrote file');
    process.exit();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
