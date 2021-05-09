import { RssArticle } from './RssArticle';
import { RssFeedDto } from "./RssFeedDto";
import Parser from 'rss-parser';

export interface IRssFeed {
    id: number;
    title: string;
    feedUrl: string;
    websiteUrl: string;
}

export class RssFeed implements IRssFeed {
    id: number;
    title: string;
    feedUrl: string;
    websiteUrl: string;

    constructor(feed: IRssFeed) {
        this.id = feed.id;
        this.title = feed.title;
        this.feedUrl = feed.feedUrl;
        this.websiteUrl = feed.websiteUrl;
    }

    toDto(): RssFeedDto {
        return new RssFeedDto(this);
    }

    async getArticles(): Promise<RssArticle[]> {
        const parser = new Parser();
        const results = await parser.parseURL(this.feedUrl);

        return results.items.map(item => {

            return new RssArticle({
                content: item.content || 'No Content',
                htmlContent: item['content:encoded'],
                link: item.link, 
                title: item.title || 'No Title',
            });
        });

    }
}