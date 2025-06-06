import gql from 'graphql-tag';

export const commonUploadAttachment = gql`
    mutation StorageAccountUploadFileFileManager (
        $file: StorageAccountFileManagerFileUploadedInput!
    ) {
        storageAccountUploadFileFileManager (
            file: $file
        )
        {
            id
            originFilename
            filename
            mimetype
            extension
            relativePathSegments
            width
            height
            size
            url
            isCropable
            isUploaded
            libraryId
            libraryFilename
            meta
            library {
                id
                originFilename
                filename
                mimetype
                extension
                relativePathSegments
                width
                height
                size
                url
                meta
            }
        }
    }
`;

export const commonUploadAttachments = gql`
    mutation StorageAccountUploadFilesFileManager (
        $files: [StorageAccountFileManagerFileUploadedInput!]!
    ) {
        storageAccountUploadFilesFileManager (
            files: $files
        )
        {
            id
            originFilename
            filename
            mimetype
            extension
            relativePathSegments
            width
            height
            size
            url
            isCropable
            isUploaded
            libraryId
            libraryFilename
            meta
            library {
                id
                originFilename
                filename
                mimetype
                extension
                relativePathSegments
                width
                height
                size
                url
                meta
            }
        }
    }
`;
