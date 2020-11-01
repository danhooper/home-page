import {RssService} from './../rss.service';
import {RssFeed} from './../model/RssFeed';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'dh-rss-feed-list',
    templateUrl: './rss-feed-list.component.html',
    styleUrls: ['./rss-feed-list.component.scss'],
})
export class RssFeedListComponent implements OnInit {
    feeds: RssFeed[] = [];

    constructor(private rssService: RssService) {}

    ngOnInit() {
        this.rssService.getRssFeeds().subscribe((feeds) => {
            this.feeds = feeds;
        });
    }
}
