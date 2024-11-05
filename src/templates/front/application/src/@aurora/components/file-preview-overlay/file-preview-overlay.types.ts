export interface FilePreviewDialogConfig
{
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    file?: FilePreviewDialog;
}

export interface FilePreviewDialog
{
    filename: string;
    url: string;
    mimetype: string;
    relativePathSegments: string[];
}
