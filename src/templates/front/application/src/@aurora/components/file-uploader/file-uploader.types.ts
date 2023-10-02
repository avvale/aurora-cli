export interface FileUploaded {
    id: string;
    file: File;
    relativePathSegments?: string[];
}