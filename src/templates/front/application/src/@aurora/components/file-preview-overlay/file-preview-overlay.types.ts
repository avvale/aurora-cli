export interface FilePreviewDialogConfig
{
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    image?: Image;
}

export interface Image
{
    filename: string;
    prefix: string;
    binary: string;
    mime: string;
}
