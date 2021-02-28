export interface IRssFeed {
    id: number;
    title: string;
    websiteUrl: string;
}

export class RssFeed implements IRssFeed {
    id: number;
    title: string;
    websiteUrl: string;
    lastUpdatedAt: Date;

    constructor(feed: IRssFeed) {
        this.title = feed.title;
        this.id = feed.id;
        this.websiteUrl = feed.websiteUrl;
    }
}
