import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    Input,
    ChangeDetectorRef,
} from '@angular/core';
import {RssFeed} from '../model/RssFeed';
import {RssService} from '../rss.service';
import {RssArticle} from '../model/RssArticle';
import {map, tap} from 'rxjs/operators';
import {of, Observable} from 'rxjs';

@Component({
    selector: 'dh-rss-feed-detail',
    templateUrl: './rss-feed-detail.component.html',
    styleUrls: ['./rss-feed-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RssFeedDetailComponent implements OnInit {
    @Input() feed: RssFeed;
    articles$: Observable<RssArticle[]> = of([]);

    constructor(
        private rssService: RssService,
        private el: ElementRef,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.articles$ = this.rssService.getArticles(this.feed).pipe(
            tap(() => {
                this.feed.lastUpdatedAt = new Date();
                this.cdr.detectChanges();
            }),
            map(articles => articles.slice(0, 10)));
    }

    onOpenPanel() {
        Array.from(this.el.nativeElement.querySelectorAll('a')).forEach(
            (el: any) => {
                el.setAttribute('target', '_blank');
                el.setAttribute('rel', 'noopener');
            },
        );
    }
}
