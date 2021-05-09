export interface IRssArticle {
    content: string;
    htmlContent: string;
    link?: string;
    title: string;
}

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