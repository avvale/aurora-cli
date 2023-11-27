export interface FileUploaded {
    id: string;
    file: File;
    relativePathSegments?: string[];
    hasCreateLibrary?: boolean;
}