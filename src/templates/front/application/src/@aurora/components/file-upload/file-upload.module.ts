import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadComponent } from './file-upload.component';


@NgModule({
    imports: [
        CommonModule,
        NgxFileDropModule,

        MatButtonModule,
        MatIconModule,
    ],
    declarations: [
        FileUploadComponent,
    ],
    exports: [
        FileUploadComponent,
    ],
})
export class FileUploadModule { }
