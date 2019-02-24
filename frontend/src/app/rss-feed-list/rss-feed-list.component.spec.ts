import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssFeedListComponent } from './rss-feed-list.component';

describe('RssFeedListComponent', () => {
    let component: RssFeedListComponent;
    let fixture: ComponentFixture<RssFeedListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RssFeedListComponent],
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
