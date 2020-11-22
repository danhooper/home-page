import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {RssService} from './../rss.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RssFeedDetailComponent} from './rss-feed-detail.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TimeAgoPipe} from 'time-ago-pipe';
import {RssFeed} from '../model/RssFeed';

describe('RssFeedDetailComponent', () => {
    let component: RssFeedDetailComponent;
    let fixture: ComponentFixture<RssFeedDetailComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            declarations: [RssFeedDetailComponent, TimeAgoPipe],
            providers: [RssService],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RssFeedDetailComponent);
        component = fixture.componentInstance;
        component.feed = new RssFeed({
            id: 1,
            title: 'foo',
            feedUrl: 'https://example.com/rss',
            websiteUrl: 'https://example.com,',
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
