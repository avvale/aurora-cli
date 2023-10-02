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
            filename
            mimetype
            encoding
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
            filename
            mimetype
            encoding
        }
    }
`;
