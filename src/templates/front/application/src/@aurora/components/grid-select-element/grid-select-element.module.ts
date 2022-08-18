import { NgModule } from '@angular/core';
import { GridSelectElementComponent } from './grid-select-element.component';
import { GridDialogModule } from '../grid-dialog';

@NgModule({
    imports: [
        // @aurora
        GridDialogModule,
    ],
    declarations: [
        GridSelectElementComponent,
    ],
    exports: [
        GridSelectElementComponent,
    ],
})

export class GridSelectElementModule
{ }
