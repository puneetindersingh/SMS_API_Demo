import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { APIComponent } from './api.component';
import { APIService } from './api.service';

@NgModule({
    declarations: [
        APIComponent
    ],
    imports: [
        SharedModule
    ],
    providers: [
        APIService
    ],
    exports: [
        APIComponent
    ]
})

export class APIModule {

}