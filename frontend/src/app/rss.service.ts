import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RssArticle, IRssArticle} from './model/RssArticle';
import {RssFeed, IRssFeed} from './model/RssFeed';
import {timer, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RssService {
    constructor(private http: HttpClient) {}

    getRssFeeds(): Observable<RssFeed[]> {
        return this.http.get<IRssFeed[]>('/backend/feedConfig')
            .pipe(map(result => {
                return result.map(f => new RssFeed(f));
            }));
    }

    getArticles(feed: RssFeed): Observable<RssArticle[]> {
        return timer(0, 600000).pipe(
            switchMap(() => this.http.get<IRssArticle[] | null>(`/backend/article${feed.id}`)),
            map(result => (result || []).map((article) => new RssArticle(article))),
        );
    }
}
