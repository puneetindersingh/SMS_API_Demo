import { Injectable } from '@angular/core';
import { routing } from './../app.routing';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { APIComponent } from './api.component';
import { ErrorService } from '../errors/error.service';

@Injectable()

export class APIService {
    // client id and secret obtained from signing up to the API on the s.dev portal.
    // you can use these or replace them with your own. 
    client_id = 'paA9CZP1mgtar1DojNtRAd4p8ceHDANL';
    client_secret = 'tylPi0b2rNLIyErH';

    constructor(private http: Http, private router: Router, private errorService: ErrorService) {}

    // gets the access token using the client id and secret
    getToken() {
        const body = {
            client_id: this.client_id,
            client_secret: this.client_secret
        };

        // pass the credentials in with the request body. All the http.method calls call the respective node.js
        // function on the server side. Code located in /routes/sms-api.js
        return this.http.post('/sms-api', body)
            .map((response: Response) => {
                // store the returned access_token in local storage for easy use
                localStorage.setItem('access_token', response.json().token);
                return response.json().obj;
            })
            .catch((error: Response) => {
                // The error might be because the token timed out, so reset here.
                // this is just quick and dirty and hasnt actually been tested
                localStorage.clear();
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // sends the sms
    sendSMS(formData: any) {
        // send the token and form data to the server in the body
        const body = {
            token: localStorage.getItem('access_token'),
            phoneNumber: formData.phoneNumber,
            message: formData.message
        };
        // set headers
        const headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
        
        return this.http.post('/sms-api/send', body, {headers: headers})
            .map((response: Response) => {
                return response.json().obj;
            })
            .catch((error: Response) => {
                localStorage.clear();
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // polls the latest message sent
    onPoll(messageID: string) {
        // the message id and token are just passed in as req.params here, since its a get request.
        return this.http.get('/sms-api/' + messageID + '/' + localStorage.getItem('access_token'))
            .map((response: Response) => {
                return response.json().obj;
            })
            .catch((error: Response) => {
                localStorage.clear();
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }
}