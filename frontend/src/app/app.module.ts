import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AppComponent } from './app.component';
import { RssFeedListComponent } from './rss-feed-list/rss-feed-list.component';
import { RssFeedDetailComponent } from './rss-feed-detail/rss-feed-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        RssFeedListComponent,
        RssFeedDetailComponent,
        TimeAgoPipe,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        MatExpansionModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
