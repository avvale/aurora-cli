import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from './dialog.component';

@NgModule({
    entryComponents: [
        DialogComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
    ],
    declarations: [
        DialogComponent,
    ],
    exports: [
        DialogComponent,
    ],
})

export class DialogModule
{
}
