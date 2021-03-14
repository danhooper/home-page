import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

interface Config {
    backendBase: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
    private configObs = this.http.get<Config>('/assets/config.json').pipe(
        shareReplay(1)
    );

  constructor(private http: HttpClient) { }

  getConfig(): Observable<Config> {
      return this.configObs;
  }

}
