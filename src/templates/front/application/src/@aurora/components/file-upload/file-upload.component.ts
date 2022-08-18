import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

interface FileEntry
{
    file: NgxFileDropEntry;
    fsFile: FileSystemFileEntry;
    name: string;
    type: string;
    size: number;
}

@Component({
    selector   : 'au-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls  : ['./file-upload.component.scss'],
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

    addedFiles: FileEntry[] = [];

    constructor()
    {
        // Constructor
    }

    fileAdd(files: NgxFileDropEntry[]): void
    {
        // Reset list of files after each add ---> TODO: necessary? if multiple can we upload in multiple times?
        this.addedFiles = [];

        for (const droppedFile of files)
        {
            // Is it a file or a directory?
            if (droppedFile.fileEntry.isFile)
            {
                // It was a file --> ADD TO FILES
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                const fileName = droppedFile.relativePath;
                let fileType = '';
                let fileSize = 0;
                console.log(droppedFile.relativePath, fileEntry);

                fileEntry.file((file: File) =>
                {
                    console.log('EACH; FILE', file);
                    fileType = file.type;
                    fileSize = file.size;
                });

                this.addedFiles.push({
                    file  : droppedFile,
                    fsFile: fileEntry,
                    name  : fileName,
                    type  : fileType,
                    size  : fileSize,
                });
            }
            else
            {
                // It was a directory ---> DO NOTHING
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        }

        // After adding all, emit files
        console.log('COMPONENT; FILES', this.addedFiles);
        this.files.emit(this.addedFiles);
    }

    fileEnter(event): void
    {
        console.log(event);
    }

    fileLeave(event): void
    {
        console.log(event);
    }

    fileRemove(file): void
    {
        this.addedFiles = this.addedFiles.filter(f => f.name != file.name);
        this.files.emit(this.addedFiles);
    }

    calculateSize(size: number): { size: number; unit: string; }
    {
        let calcSize = size;
        let calcUnit = 'B';

        // Transform B ---> KB
        if (calcSize >= 1024)
        {
            calcSize = calcSize / 1024;
            calcUnit = 'KB';
        }

        // Transform KB ---> MB
        if (calcSize >= 1024)
        {
            calcSize = calcSize / 1024;
            calcUnit = 'MB';
        }

        return {
            size: Math.round(calcSize),
            unit: calcUnit,
        };
    }
}
