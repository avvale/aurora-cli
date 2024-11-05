import { log } from '@aurora';
import { NgxFileDropEntry } from 'ngx-file-drop';

export const getFilesUploaded = (fileDropEntries: NgxFileDropEntry[]): Promise<File[]> =>
{
    return new Promise((resolve, reject) =>
    {
        const files: File[] = [];
        for (const [index, fileDropEntry] of fileDropEntries.entries())
        {
            // Is it a file or a directory?
            if (fileDropEntry.fileEntry.isFile)
            {
                // It was a file --> ADD TO FILES
                const fileSystemEntry = fileDropEntry.fileEntry as FileSystemFileEntry;
                fileSystemEntry.file((file: File) =>
                {
                    files.push(file);
                    if (index === fileDropEntries.length - 1) resolve(files);
                });
            }
            else
            {
                // It was a directory ---> DO NOTHING
                const fileEntry = fileDropEntry.fileEntry as FileSystemDirectoryEntry;
                log('[DEBUG] Directory relative path file uploaded: ', fileDropEntry.relativePath);
                log('[DEBUG] Uploaded a directory: ', fileEntry);
            }
        }
    });
};