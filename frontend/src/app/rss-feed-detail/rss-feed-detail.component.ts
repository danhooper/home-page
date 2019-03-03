import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    Input,
    OnDestroy,
    ChangeDetectorRef,
} from '@angular/core';
import {RssFeed} from '../model/RssFeed';
import {RssService} from '../rss.service';
import {RssArticle} from '../model/RssArticle';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';

@Component({
    selector: 'dh-rss-feed-detail',
    templateUrl: './rss-feed-detail.component.html',
    styleUrls: ['./rss-feed-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RssFeedDetailComponent implements OnInit, OnDestroy {
    @Input() feed: RssFeed;
    articles: RssArticle[] = [];
    destroy = new ReplaySubject(1);

    constructor(
        private rssService: RssService,
        private el: ElementRef,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.rssService
            .getArticles(this.feed)
            .pipe(takeUntil(this.destroy))
            .subscribe(articles => {
                this.articles = articles.slice(0, 10);
                this.cdr.detectChanges();
            });
    }

    ngOnDestroy() {
        this.destroy.next(true);
        this.destroy.complete();
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
