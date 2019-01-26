export interface IRssArticle {
    title: string;
    description: string;
}

export class RssArticle implements IRssArticle {
    title: string;
    description: string;

    constructor(article: IRssArticle) {
        this.title = article.title;
        this.description = article.description;
    }
}