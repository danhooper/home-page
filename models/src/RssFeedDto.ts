import { type IRssArticle } from './RssArticle'

export interface IRssFeedDto {
  title: string
  websiteUrl: string
}

export class RssFeedDto implements IRssFeedDto {
  title: string
  websiteUrl: string

  constructor (feed: IRssFeedDto) {
    this.title = feed.title
    this.websiteUrl = feed.websiteUrl
  }
}

export interface IRssFeedWithArticles extends IRssFeedDto {
  articles: IRssArticle[]
}
