export interface IRssArticle {
    title: string;
    url: string;
    content: string;
    htmlContent?: string;
}

export interface SyndContent {
    type: string;
    value: string;
}

export class RssArticle implements IRssArticle {
    title: string;
    url: string;
    content: string;

    constructor(article: IRssArticle) {
        this.title = article.title;
        this.content = article.htmlContent || article.content;
        this.url = article.url;
    }
}
