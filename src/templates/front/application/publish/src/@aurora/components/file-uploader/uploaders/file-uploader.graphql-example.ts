import gql from 'graphql-tag';

export const uploadFileMutation = gql`
    mutation YourBoundedContextUploadFile (
        $file: CoreFileUploaded!
    ) {
        yourBoundedContextUploadFile (
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

export const uploadFilesMutation = gql`
    mutation YourBoundedContextUploadFiles (
        $files: [CoreFileUploaded!]!
    ) {
        yourBoundedContextUploadFiles (
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
