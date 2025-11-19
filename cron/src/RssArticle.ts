import type { IRssArticle } from '@dh-home-page/models/RssArticle';

export class RssArticle {
    content: string;
    htmlContent: string;
    link?: string;
    title: string;

    constructor({ content, htmlContent, link, title }: IRssArticle) {
        this.content = content;
        this.htmlContent = htmlContent;
        this.link = link;
        this.title = title;
    }
}
