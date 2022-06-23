import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMergicApp } from '../interfaces/IMergicApp.interface';

@Injectable()
export class MergicService {
    appInfos: IMergicApp[] = [];
    apiKey: string = '';
    urlQueues: string = '';
    owner: string = '';
    repository: string = '';
    baseUrl: string = 'https://api.mergify.com/v1';
    httpOptions: any;


    constructor(private http: HttpClient) {
        this.apiKey = env.MERGIFY_API_KEY;
        this.httpOptions = {
            headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.apiKey })
        };
    }

    getAppInfos(): Observable<any> {

        return this.http.get<IMergicApp>(this.baseUrl + '/application', this.httpOptions);
    }

    getQueue() {
        this.urlQueues = `${this.baseUrl}/repos/${env.github_owner}/${env.github_repo}/queues`;

        return this.http.get<IMergicApp>(this.urlQueues, this.httpOptions);
    }
}