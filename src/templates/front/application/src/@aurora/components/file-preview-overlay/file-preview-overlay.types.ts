export interface FilePreviewDialogConfig
{
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    file?: FilePreviewDialog;
}

export interface FilePreviewDialog
{
    originFilename: string;
    filename: string;
    url: string;
    mimetype: string;
    relativePathSegments: string[];
}
