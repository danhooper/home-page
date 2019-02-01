import { Component, OnInit, Input } from '@angular/core';
import { RssFeed } from '../model/RssFeed';
import { RssService } from '../rss.service';
import { RssArticle } from '../model/RssArticle';

@Component({
  selector: 'dh-rss-feed-detail',
  templateUrl: './rss-feed-detail.component.html',
  styleUrls: ['./rss-feed-detail.component.scss']
})
export class RssFeedDetailComponent implements OnInit {
  @Input() feed: RssFeed;
  articles: RssArticle[] = [];

  constructor(private rssService: RssService) { }

  ngOnInit() {
    this.rssService.getArticles(this.feed).subscribe((articles) => {
      this.articles = articles.slice(0, 10);
    });
  }

}
