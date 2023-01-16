import { NgModule } from '@angular/core';
import { CanPipe } from './pipes/can.pipe';

@NgModule({
    declarations: [
        CanPipe,
    ],
    exports: [
        CanPipe,
    ],
})
export class AuthorizationModule { }