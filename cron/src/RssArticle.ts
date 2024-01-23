import { type IRssArticle } from '@dh-home-page/models/RssArticle';

export class RssArticle {
    content: string;
    htmlContent: string;
    link?: string;
    title: string;

    constructor(article: IRssArticle) {
        this.content = article.content;
        this.htmlContent = article.htmlContent;
        this.link = article.link;
        this.title = article.title;
    }
}
