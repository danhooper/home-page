import { ConfigService } from './config.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RssArticle, IRssArticle} from './model/RssArticle';
import {RssFeed, IRssFeed} from './model/RssFeed';
import {pipe, timer, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RssService {
    constructor(private http: HttpClient, private configService: ConfigService) {}

    getRssFeeds(): Observable<RssFeed[]> {
        return this.configService.getConfig().pipe(
            switchMap(config => this.http.get<IRssFeed[]>(`${config.backendBase}/rss`)),
            map((result) => result.map((feed) => new RssFeed(feed))),
        );
    }

    getArticles(feed: RssFeed): Observable<RssArticle[]> {
        return timer(0, 600000).pipe(
            switchMap(() => this.configService.getConfig()),
            switchMap(config => this.http.get<IRssArticle[] | null>(`${config.backendBase}/rss/${feed.id}/article`)),
            map(result => (result || []).map((article) => new RssArticle(article))),
        );
    }
}
