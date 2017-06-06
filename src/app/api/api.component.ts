import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService } from './api.service';

@Component({
    selector: 'app-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.css']
})

export class APIComponent {
    
    smsForm: FormGroup;
    responses: string[] = [];
    messageID: string;

    // regex for phone number validation
    phoneRegex = `(?:\\+?61)4 ?(?:(?:[01] ?[0-9]|2 ?[0-57-9]|3 ?[1-9]|4 ?[7-9]|5 ?[018]) ?[0-9]|3 ?0 ?[0-5])(?: ?[0-9]){5}`;

    constructor(private apiService: APIService) {}

    // when user clicks submit
    onSubmit() {
        // check if a token already exists
        if(!localStorage.getItem('access_token')) {
            // if not then get the token and send the SMS
            this.apiService.getToken().subscribe(
                (data: any) => {
                    console.log(data);
                    this.responses.push(JSON.stringify(data));
                    this.sendSMS();
                },
                (error: any) => {
                    console.log(error);
                }
            )
        } else {
            // send SMS
            this.sendSMS();
        }
    }

    // sends the SMS
    sendSMS() {
        // gets data from the form
        let formData = {
            phoneNumber: this.smsForm.get('phoneNumber').value,
            message: this.smsForm.get('message').value
        };

        this.apiService.sendSMS(formData).subscribe(
            (data: any) => {
                // messageId returns as a full url, but we only need everything after the last / as that is
                // the actual messageId
                if(data.messageID) {
                    this.messageID = data[0].messageId.substr(data[0].messageId.lastIndexOf('/') + 1);
                }
                this.responses.push(JSON.stringify(data));
            },
            (error: any) => {
                console.log(error);
            }
        )
    }

    // uses the last messageId and performs the poll function of the SMS API
    onPoll() {
        this.apiService.onPoll(this.messageID).subscribe(
            (data: any) => {
                console.log(data);
                this.responses.push(JSON.stringify(data));
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    // resets form data, messageID and the token
    onReset() {
        this.smsForm.reset();
        this.responses = [];
        localStorage.clear();
        this.messageID = null;
    }

    // form setup
    ngOnInit() {
        this.smsForm = new FormGroup({
            phoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.phoneRegex)]),
            message: new FormControl('', Validators.required) 
        });
    }
}