import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

/**
 * Shared module imports a bunch of stuff that a lot of the components use, like the modal and forms.
 * With this, those classes only have to import this shared module rather than all this stuff everytime.
 */

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2Bs3ModalModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2Bs3ModalModule
    ]
})

export class SharedModule{}