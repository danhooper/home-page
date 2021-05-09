export interface IRssFeedDto {
    id: number;
    title: string;
    websiteUrl: string;
}

export class RssFeedDto implements IRssFeedDto {
    id: number;
    title: string;
    websiteUrl: string;

    constructor(feed: IRssFeedDto) {
        this.id = feed.id;
        this.title = feed.title;
        this.websiteUrl = feed.websiteUrl;
    }
}