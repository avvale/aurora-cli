import gql from 'graphql-tag';

const fields = `
    id
    uuid
    commonUuid
    langUuid
    attachableType
    attachableUuid
    familyUuid
    sort
    alt
    title
    pathname
    filename
    url
    mime
    extension
    size
    width
    height
    libraryUuid
    libraryFileName
    library {
        id
        uuid
        name
    }
`;

const relationsFields = `
    adminAttachmentFamilies (query:$attachmentFamilyQuery) {
        id
        uuid
        name
    }
`;

export const graphQL = {
    fields,
    relationsFields,
};

export const uploadFilesMutation = gql`
    mutation CommonUploadFiles (
        $files: [CoreFileUploaded!]!
    ) {
        commonUploadFiles (
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
