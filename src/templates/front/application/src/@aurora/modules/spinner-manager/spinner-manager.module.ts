import { NgModule } from '@angular/core';
import { GetSpinnerFlagPipe } from './get-spinner-flag.pipe';

@NgModule({
    declarations: [
        GetSpinnerFlagPipe,
    ],
    exports: [
        GetSpinnerFlagPipe,
    ],
})
export class SpinnerManagerModule { }
