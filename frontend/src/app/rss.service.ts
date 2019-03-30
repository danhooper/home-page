import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RssArticle, IRssArticle} from './model/RssArticle';
import {RssFeed, IRssFeed} from './model/RssFeed';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RssService {
    constructor(private http: HttpClient) {}

    getRssFeeds(): Observable<RssFeed[]> {
        return this.http.get<IRssFeed[]>('backend/rss').pipe(
            map(result => {
                return result.map(feed => new RssFeed(feed));
            }),
        );
    }

    getArticles(feed: RssFeed): Observable<RssArticle[]> {
        const articleSubject = new ReplaySubject<RssArticle[]>(1);
        this.fetchArticles(feed, articleSubject);
        return articleSubject.asObservable();
    }

    private fetchArticles(
        feed: RssFeed,
        articleSubject: ReplaySubject<RssArticle[]>,
    ) {
        return this.http
            .get<IRssArticle[]>(`backend/rss/${feed.id}/article`)
            .pipe(
                map(result => {
                    return result.map(article => new RssArticle(article));
                }),
            )
            .subscribe(articles => {
                if (articleSubject.observers.length > 0) {
                    articleSubject.next(articles);
                    feed.lastUpdatedAt = new Date();
                    setTimeout(
                        () => this.fetchArticles(feed, articleSubject),
                        600000,
                    );
                } else {
                    articleSubject.complete();
                }
            });
    }
}
