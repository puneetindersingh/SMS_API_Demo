import { EventEmitter } from '@angular/core';

import { Error } from './error.model';

//@Injectable()

/**
 * Event emitter that tells the error.component to display a modal with the error object data. Error data
 * pretty much always comes back from the server.
 */

export class ErrorService{

    errorOccured = new EventEmitter<Error>();
    error: Error = null;

    //constructor(@Inject(forwardRef(() => AuthService)) private authService: AuthService) {}

    handleError(error: any) {
        // check if theres already an error being displayed.
        // This is a bit of dodgy work around, it ensures only one error modal can be displayed at a time.
        // I do this because when more than one error modal was displayed, closing one closed them all but kept the 
        // backdrop and the user couldnt click anything. This was a quick fix that I never came back to fix properly, and
        // honestly probably never would have anyway.
        if(this.error == null) {
            console.log(error);
            if(error.expired) {
                // clears the local storage when the error json contains the expired key
                //this.authService.logOut();
                localStorage.clear();
            }
            const errorData = new Error(error.title, error.error.message);
            this.error = errorData;
            this.errorOccured.emit(errorData);
        }
    }
}