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
    relationsFields
};
