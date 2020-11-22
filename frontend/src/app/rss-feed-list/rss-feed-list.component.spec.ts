import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RssFeedListComponent} from './rss-feed-list.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RssService} from '../rss.service';

describe('RssFeedListComponent', () => {
    let component: RssFeedListComponent;
    let fixture: ComponentFixture<RssFeedListComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            declarations: [RssFeedListComponent],
            providers: [RssService],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RssFeedListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
