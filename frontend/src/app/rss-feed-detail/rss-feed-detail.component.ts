import { Component, ElementRef, OnInit, Input } from '@angular/core';
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

  constructor(private rssService: RssService, private el: ElementRef) { }


  ngOnInit() {
    this.rssService.getArticles(this.feed).subscribe((articles) => {
      this.articles = articles.slice(0, 10);
    });
  }

  onOpenPanel() {
    Array.from(this.el.nativeElement.querySelectorAll('a'))
        .forEach((el: any) => {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener');
        });
  }

}
