import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { log } from '@aurora';
import { FormatFileSizePipe } from './../../pipes/format-file-size.pipe';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry, NgxFileDropModule } from 'ngx-file-drop';

interface FileEntry
{
    file: NgxFileDropEntry;
    fsFile: FileSystemFileEntry;
    name: string;
    type: string;
    size: number;
}

@Component({
    selector       : 'au-file-upload',
    templateUrl    : './file-upload.component.html',
    styleUrls      : ['./file-upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        FormatFileSizePipe, MatButtonModule, MatIconModule, NgForOf, NgIf, NgxFileDropModule,
    ],
})
export class FileUploadComponent
{
    @Input('label') label: string = '';
    @Input('dropLabel') dropLabel: string = 'Drop files here';
    @Input('browseLabel') browseLabel: string = 'or click here to browse files';
    @Input('acceptType') acceptType: string = '';
    @Input('hasBrowse') hasBrowse: boolean = true;
    @Input('isMultiple') isMultiple: boolean = false;
    @Input('isDisabled') isDisabled: boolean = false;
    @Output('files') files = new EventEmitter<FileEntry[]>();
    filesContainer: FileEntry[] = [];

    fileAdd(files: NgxFileDropEntry[]): void
    {
        // Reset list of files after each add ---> TODO: necessary? if multiple can we upload in multiple times?
        const newFiles: FileEntry[] = [];

        for (const [index, droppedFile] of files.entries())
        {
            // Is it a file or a directory?
            if (droppedFile.fileEntry.isFile)
            {
                // It was a file --> ADD TO FILES
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                const fileName = droppedFile.relativePath;

                log('[DEBUG] File relative path file uploaded: ', droppedFile.relativePath);

                fileEntry
                    .file((file: File) =>
                    {
                        log('[DEBUG] Properties file uploaded: ', file);
                        newFiles.push({
                            file  : droppedFile,
                            fsFile: fileEntry,
                            name  : fileName,
                            type  : file.type,
                            size  : file.size,
                        });

                        if (index === files.length - 1)
                        {
                            this.filesContainer = [...this.filesContainer, ...newFiles];

                            // After adding all, emit files
                            this.files.emit(this.filesContainer);
                        }
                    });
            }
            else
            {
                // It was a directory ---> DO NOTHING
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                log('[DEBUG] Directory relative path file uploaded: ', droppedFile.relativePath);
                log('[DEBUG] Uploaded a directory: ', fileEntry);
            }
        }
    }

    fileEnter(event): void
    {
        log('[DEBUG] onFileOver event: ', event);
    }

    fileLeave(event): void
    {
        log('[DEBUG] onFileLeave event: ', event);
    }

    fileRemove(file): void
    {
        this.filesContainer = this.filesContainer.filter(f => f.name != file.name);
        this.files.emit(this.filesContainer);
    }
}
