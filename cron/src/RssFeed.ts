import { IRssArticle } from '@dh-home-page/models/RssArticle';
import { type IRssFeed } from '@dh-home-page/models/RssFeed';
import { RssFeedDto } from '@dh-home-page/models/RssFeedDto';
import Parser from 'rss-parser';
import { RssArticle } from './RssArticle';

export class RssFeed implements IRssFeed {
    title: string;
    feedUrl: string;
    websiteUrl: string;

    constructor(feed: IRssFeed) {
        this.title = feed.title;
        this.feedUrl = feed.feedUrl;
        this.websiteUrl = feed.websiteUrl;
    }

    toDto(): RssFeedDto {
        return new RssFeedDto(this);
    }

    async getArticles(): Promise<IRssArticle[]> {
        const parser = new Parser();
        let results: any[] = [];
        try {
            results = (await parser.parseURL(this.feedUrl)).items;
        } catch (err) {
            console.error(`Error fetching articles for ${this.title}`, err);
        }

        const old = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        return results
            .filter((item) => {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions,@typescript-eslint/no-unsafe-argument
                return !item.isoDate || new Date(item.isoDate) > old;
            })
            .slice(0, 10)
            .map((item) => {
                return new RssArticle({
                    content: (item.content ?? 'No Content').trim(),
                    htmlContent: (item['content:encoded'] ?? '').trim(),
                    link: (item.link ?? '').trim(),
                    title: (item.title ?? 'No Title').trim(),
                });
            });
    }
}
