export interface IRssFeed {
    id: number;
    title: string;
    url: string;
}

export class RssFeed implements IRssFeed {
    id: number;
    title: string;
    url: string;

    constructor(feed: IRssFeed) {
        this.title = feed.title;
        this.url = feed.url;
    }
}