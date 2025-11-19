import type { IRssFeed } from '@dh-home-page/models/RssFeed';
import Parser, { type Item } from 'rss-parser';
import { RssArticle } from './RssArticle';
import { IRssArticle } from '@dh-home-page/models/RssArticle';

export class RssFeed implements IRssFeed {
    title: string;
    feedUrl: string;
    websiteUrl: string;

    constructor({ title, feedUrl, websiteUrl }: IRssFeed) {
        this.title = title;
        this.feedUrl = feedUrl;
        this.websiteUrl = websiteUrl;
    }

    async getArticles(): Promise<IRssArticle[]> {
        const parser = new Parser();
        let results: Array<Item & { 'content:encoded'?: string }> = [];
        try {
            results = (await parser.parseURL(this.feedUrl)).items;
        } catch (err) {
            console.error(`Error fetching articles for ${this.title}`, err);
        }

        const old = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        return results
            .filter((item) => !item.isoDate || new Date(item.isoDate) > old)
            .slice(0, 10)
            .map(
                (item) =>
                    new RssArticle({
                        content: (item.content ?? 'No Content').trim(),
                        htmlContent: (item['content:encoded'] ?? '').trim(),
                        link: (item.link ?? '').trim(),
                        title: (item.title ?? 'No Title').trim(),
                    }),
            );
    }
}
