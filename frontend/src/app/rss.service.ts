import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RssFeed, IRssFeed} from './model/RssFeed';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RssService {

  constructor(private http: HttpClient) {}

  getRssFeeds(): Observable<RssFeed[]> {
      return this.http.get<IRssFeed[]>('http://localhost:8080/rss').pipe(map(result => {
          return result.map(feed => new RssFeed(feed));
      }));
  }
}