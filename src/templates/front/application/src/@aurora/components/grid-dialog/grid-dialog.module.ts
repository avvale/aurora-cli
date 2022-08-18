import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GridDialogComponent } from './grid-dialog.component';
import { GridModule } from '../grid';

@NgModule({
    entryComponents: [
        GridDialogComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,

        // @aurora
        GridModule,
    ],
    declarations: [
        GridDialogComponent,
    ],
    exports: [
        GridDialogComponent,
    ],
})

export class GridDialogModule
{ }
