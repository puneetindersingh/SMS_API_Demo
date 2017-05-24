import { NgModule } from '@angular/core';
import { ErrorComponent } from './error.component';
import { ErrorService } from './error.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ErrorComponent
    ],
    imports: [
        SharedModule
    ],
    providers: [
        ErrorService
    ],
    exports: [
        ErrorComponent
    ]
})

export class ErrorModule {}