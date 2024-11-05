import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { FileIconTemplateDirective, FileUploadButtonTemplateDirective, FileUploadContentTemplateDirective } from '@aurora/components/file-upload';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        FileUploadComponent,
        FileIconTemplateDirective,
        FileUploadButtonTemplateDirective,
        FileUploadContentTemplateDirective,
        MatTooltipModule,
    ],
    exports: [
        FileUploadComponent,
        FileIconTemplateDirective,
        FileUploadButtonTemplateDirective,
        FileUploadContentTemplateDirective,
        MatTooltipModule,
    ],
})
export class FileUploadModule { }
