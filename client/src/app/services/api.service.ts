import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {SettingsContainer} from '../objects/settings-container';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ApiService {
    apiUrl: string;

    constructor(private http: HttpClient, private router: Router) {
        this.apiUrl = environment.apiUrl;
    }

    static getHeaders() {
       if (window.localStorage.getItem('token')) {
          const token = window.localStorage.getItem('token');
//          const token = JSON.parse(window.localStorage.getItem('session')).signatureToken;
           return new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': token });
       }
       return new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    }

    apiGet(path) {
        const headers = ApiService.getHeaders();

        return this.http.get(`${this.apiUrl}${path}`, {headers: headers}).toPromise();
    }

    apiPost(path, data) {
        const headers = ApiService.getHeaders();

        return this.http.post(`${this.apiUrl}${path}`, data, {headers: headers}).toPromise();
    }

    apiDelete(path, body) {
        const headers = ApiService.getHeaders();

        return this.http.delete(`${this.apiUrl}${path}`, {headers: headers, withCredentials: true}).toPromise();
    }

    postWidget(settings: SettingsContainer, serviceLabel: string = null, widgetLabel: string = null) {
        if (serviceLabel == null || widgetLabel == null) {
            return;
        }
        const prefix = '/' + serviceLabel + '/' + widgetLabel + '/';
        const path = prefix + ((settings.id.length === 0) ? '' : (settings.id + '/params'));
        console.log('LOL MDR : ', settings.params);
        this.apiPost(path, settings.params).then(responsePost => {
            if (responsePost['success'] === true) {
                settings.connected = true;
                settings.id = responsePost['id'];
                this.getWidget(settings, prefix + settings.id);
            }
        });
    }
    getWidget(settings: SettingsContainer, path: string) {
        console.log('try get : ', path);
        this.apiGet(path).then( response => {
            console.log('GET :', response);
            if (response) {
                settings.params = response['params'];
                settings.infos = response['infos'];
            }
        });
    }
}
