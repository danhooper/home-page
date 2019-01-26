import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssFeedDetailComponent } from './rss-feed-detail.component';

describe('RssFeedDetailComponent', () => {
  let component: RssFeedDetailComponent;
  let fixture: ComponentFixture<RssFeedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssFeedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssFeedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
