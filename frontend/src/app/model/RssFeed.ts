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
    lastUpdatedAt: Date;

    constructor(feed: IRssFeed) {
        this.title = feed.title;
        this.feedUrl = feed.feedUrl;
        this.id = feed.id;
        this.websiteUrl = feed.websiteUrl;
    }
}
