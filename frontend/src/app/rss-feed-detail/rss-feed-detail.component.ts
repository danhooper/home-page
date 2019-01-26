import { Component, OnInit, Input } from '@angular/core';
import { RssFeed } from '../model/RssFeed';

@Component({
  selector: 'dh-rss-feed-detail',
  templateUrl: './rss-feed-detail.component.html',
  styleUrls: ['./rss-feed-detail.component.scss']
})
export class RssFeedDetailComponent implements OnInit {
  @Input() feed: RssFeed;

  constructor() { }

  ngOnInit() {
  }

}
