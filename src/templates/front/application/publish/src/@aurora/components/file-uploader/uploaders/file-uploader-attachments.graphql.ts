import gql from 'graphql-tag';

export const commonUploadAttachment = gql`
    mutation CommonUploadAttachment (
        $file: CoreFileUploaded!
    ) {
        commonUploadAttachment (
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
    mutation CommonUploadAttachments (
        $files: [CoreFileUploaded!]!
    ) {
        commonUploadAttachments (
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
