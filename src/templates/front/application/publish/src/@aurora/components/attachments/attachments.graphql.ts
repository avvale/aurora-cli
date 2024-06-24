import gql from 'graphql-tag';
import { commonAttachmentLibraryFields } from './attachments-library.graphql';

export const commonAttachmentFields = `
    id
    familyId
    attachableId
    langId
    sort
    alt
    title
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
    sizes
    meta
`;

export const commonCreateCropMutation = gql`
    mutation CommonCreateCrop (
        $attachment: CommonCreateAttachmentInput!
        $crop: CommonCropPropertiesInput!
    )
    {
        commonCreateCrop (
            attachment:$attachment
            crop:$crop
        )
        {
            attachment {
                ${commonAttachmentFields}
                isCropped
                isUploaded
                isChanged
                library {
                    ${commonAttachmentLibraryFields}
                }
            }
            crop {
                x
                y
                width
                height
                rotate
                scaleX
                scaleY
            }
        }
    },
`;

export const commonDeleteAttachmentMutation = gql`
    mutation CommonDeleteAttachment (
        $payload: CommonAttachmentInput!
    )
    {
        commonDeleteAttachment (
            payload: $payload
        )
        {
            ${commonAttachmentFields}
            library {
                ${commonAttachmentLibraryFields}
            }
        }
    },
`;

export const commonCreateBlobAttachmentMutation = gql`
    mutation CommonCreateBlobAttachment (
        $payload: CommonAttachmentInput!
    )
    {
        commonCreateBlobAttachment(
            payload: $payload
        )
    },
`;
