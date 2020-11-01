export interface IRssArticle {
    title: string;
    description: string;
    url: string;
    content: SyndContent[];
}

export interface SyndContent {
    type: string;
    value: string;
}

export class RssArticle implements IRssArticle {
    title: string;
    description: string;
    url: string;
    content: SyndContent[];
    longDescription: string;

    constructor(article: IRssArticle) {
        this.title = article.title;
        this.description = article.description;
        this.url = article.url;
        this.content = article.content;

        const htmlContent = this.content.find(
            (content) => content.type === 'html',
        );
        this.longDescription = htmlContent
            ? htmlContent.value
            : this.description;
    }
}
