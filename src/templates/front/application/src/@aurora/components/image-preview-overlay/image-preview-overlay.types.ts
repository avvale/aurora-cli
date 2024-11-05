export interface ImagePreviewDialogConfig
{
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    image?: ImagePreviewDialog;
}

export interface ImagePreviewDialog
{
    filename: string;
    url: string;
    mimetype: string;
    relativePathSegments: string[];
}
