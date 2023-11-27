import { BehaviorSubject } from 'rxjs';

export interface Attachment {
    id: string;
    familyId?: string;
    attachableId: string;
    sort?: number;
    alt?: string;
    title?: string;
    originFilename: string;
    filename: string;
    mimetype: string;
    extension: string;
    relativePathSegments: any;
    width?: number;
    height?: number;
    size: number;
    url: string;
    isCropable: boolean;
    isUploaded: boolean;
    isChanged: boolean;
    libraryId?: string;
    libraryFilename?: string;
    meta?: any;
    library?: AttachmentLibrary;
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

export interface AttachmentLibrary {
    id: string;
    originFilename: string;
    filename: string;
    mimetype: string;
    extension: string;
    relativePathSegments: any;
    width: number;
    height: number;
    size: number;
    url: string;
    meta?: any;
}

export interface AttachmentMessages
{
    alt: BehaviorSubject<string>;
    cancel: BehaviorSubject<string>;
    crop: BehaviorSubject<string>;
    placeholder: BehaviorSubject<string>;
    selectFamily: BehaviorSubject<string>;
    title: BehaviorSubject<string>;
}

export enum CropType
{
    FIT_CROP                = 'FIT_CROP',
    FIT_WIDTH               = 'FIT_WIDTH',
    FIT_HEIGHT              = 'FIT_HEIGHT',
    FIT_WIDTH_FREE_CROP     = 'FIT_WIDTH_FREE_CROP',
    FIT_HEIGHT_FREE_CROP    = 'FIT_HEIGHT_FREE_CROP',
}

export interface CropProperties
{
    x: number;
    y: number;
    width: number;
    height: number;
    rotate: number;
    scaleX: number;
    scaleY: number;
}

export enum ImageFormat
{
    JPG = 'JPG',
    PNG = 'PNG',
    GIF = 'GIF',
    TIF = 'TIF',
    BMP = 'BMP',
}
