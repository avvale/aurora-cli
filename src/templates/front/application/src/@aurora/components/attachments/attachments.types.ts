export interface Attachment
{
    id: number;
    familyId: string;
    sort: number;
    alt: string;
    title: string;
    path: string;
    filename: string;
    url: string;
    mime: string;
    extension: string;
    size: number;
    width: number;
    height: number;
    libraryId: string;
    libraryFilename: string;
    meta: any;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface AttachmentFamily
{
    id: number;
    name: string;
    code: string;
    width: number;
    height: number;
    fitType: CropType;
    quality: number;
    sizes: number[];
    format: ImageFormat;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export enum CropType
{
    FIT_CROP                = 'FIT_CROP',
    FIT_WIDTH               = 'FIT_WIDTH',
    FIT_HEIGHT              = 'FIT_HEIGHT',
    FIT_WIDTH_FREE_CROP     = 'FIT_WIDTH_FREE_CROP',
    FIT_HEIGHT_FREE_CROP    = 'FIT_HEIGHT_FREE_CROP',
}

export interface File
{
    url: string;
    filename: string;
    path: string;
    mime: string;
    size: number;
}

export enum ImageFormat
{
    JPG = 'JPG',
    PNG = 'PNG',
    GIF = 'GIF',
    TIF = 'TIF',
    BMP = 'BMP',
}
