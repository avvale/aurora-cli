export interface ImagePreviewDialogConfig
{
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    image?: ImagePreviewDialog;
}

export interface ImagePreviewDialog
{
    originFilename: string;
    filename: string;
    url: string;
    mimetype: string;
    relativePathSegments: string[];
}
