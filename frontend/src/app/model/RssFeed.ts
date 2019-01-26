export interface IRssFeed {
    title: string;
    url: string;

}

export class RssFeed implements IRssFeed {
    title: string;
    url: string;

    constructor(feed: IRssFeed) {
        this.title = feed.title;
        this.url = feed.url;
    }
}