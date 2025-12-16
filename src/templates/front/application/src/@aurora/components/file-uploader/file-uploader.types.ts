export interface FileUploaded {
    id: string;
    file: File;
    size?: number;
    relativePathSegments?: string[];
    hasCreateLibrary?: boolean;
}
