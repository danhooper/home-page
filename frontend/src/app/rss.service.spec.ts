import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {RssService} from './rss.service';

describe('RssService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            providers: [RssService],
        }),
    );

    it('should be created', () => {
        const service: RssService = TestBed.get(RssService);
        expect(service).toBeTruthy();
    });
});
