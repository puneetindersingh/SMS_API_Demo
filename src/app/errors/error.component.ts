import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ErrorService } from './error.service';
import { Error } from './error.model';
/**
 * ErrorComponent subscribes to the error service and displays a modal with error information
 * when the even emitter in the service emits. When the error is handled we set the local error variable in the 
 * service to null. See the error service class for more information
 */

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnInit {

    @ViewChild('modal')
    modal: ModalComponent;
    error: Error;

    constructor(private errorService: ErrorService) {}

    onErrorHandled() {
        this.errorService.error = null;
    }

    ngOnInit() {
        this.errorService.errorOccured
            .subscribe(
                (error: Error) => {
                    console.log(error);
                    this.error = error;
                    this.modal.open();
                }
            )
    }
}