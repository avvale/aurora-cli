import { Component, ChangeDetectionStrategy, input, output, ContentChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { log, FileIconTemplateDirective } from '@aurora';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { FileUploadButtonTemplateDirective } from './directives/file-upload-button-template.directive';
import { FileUploadContentTemplateDirective } from './directives/file-upload-content-template.directive';
import { NgTemplateOutlet } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector       : 'au-file-upload',
    templateUrl    : './file-upload.component.html',
    styleUrls      : ['./file-upload.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        MatButtonModule, MatIconModule, NgTemplateOutlet, NgxFileDropModule, MatTooltipModule,
    ],
})
export class FileUploadComponent
{
    // set upload button
    @ContentChild(FileUploadButtonTemplateDirective) fileUploadButtonTemplateDirective?: FileUploadButtonTemplateDirective;
    // set content drop area
    @ContentChild(FileUploadContentTemplateDirective) fileUploadContentTemplateDirective?: FileUploadContentTemplateDirective;

    @ContentChild(FileIconTemplateDirective) fileIconTemplateDirective?: FileIconTemplateDirective;

    onFileDrop = output<NgxFileDropEntry[]>();
    onFileOver = output<DragEvent[]>();
    onFileLeave = output<DragEvent[]>();
    label = input<string>();
    btnLabel = input<string>('Upload');
    dropLabel = input<string>('Drop your files here');
    fileDisplay = input<string>('id');
    acceptType = input<string>('');
    isMultiple = input<boolean>(false);
    isDisabled = input<boolean>(false);

    files = input<any[]>([]);
    onFileDownload = output<any>();
    onFileRemove = output<any>();

    fileDrop(filesDropEntry: NgxFileDropEntry[]): void
    {
        log('[DEBUG] fileDrop event: ', filesDropEntry);
        this.onFileDrop.emit(filesDropEntry);
    }

    fileOver(event): void
    {
        log('[DEBUG] onFileOver event: ', event);
        this.onFileOver.emit(event);
    }

    fileLeave(event): void
    {
        log('[DEBUG] onFileLeave event: ', event);
        this.onFileLeave.emit(event);
    }

    fileDownload(file): void
    {
        log('[DEBUG] onFileDownload event: ', file);
        this.onFileDownload.emit(file);
    }

    fileRemove(file): void
    {
        log('[DEBUG] onFileRemove event: ', file);
        this.onFileRemove.emit(file);
    }
}
