import { CommonCreateAttachmentInput, CommonUpdateAttachmentByIdInput } from '@api/graphql';
import { CommonCreateAttachmentsCommand, CommonUpdateAttachmentByIdCommand } from '@app/common/attachment';
import { CommonCreateAttachmentLibrariesCommand } from '@app/common/attachment-library';
import { ICommandBus, storagePublicAbsoluteDirectoryPath, storagePublicAbsolutePath, storagePublicAbsoluteURL } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { copyFileSync, existsSync, mkdirSync, unlinkSync } from 'node:fs';

@Injectable()
export class CommonAttachmentsService
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async createUploadedAttachments(
        attachableId: string,
        attachments: CommonCreateAttachmentInput[],
        placesRelativePathSegments: string[],
    ): Promise<void>
    {
        const uploadedAttachmentLibraries = [];
        const uploadedAttachments = [];
        // const attachments = [];
        for (const attachment of attachments)
        {
            if (!attachment.isUploaded) continue;

            const absoluteDirectoryPath = storagePublicAbsoluteDirectoryPath(placesRelativePathSegments);

            // create directory if not exists
            if (!existsSync(absoluteDirectoryPath)) mkdirSync(absoluteDirectoryPath, { recursive: true });

            const tempAbsolutePath = storagePublicAbsolutePath(attachment.relativePathSegments, attachment.filename);
            attachment.relativePathSegments = placesRelativePathSegments;
            attachment.url = storagePublicAbsoluteURL(placesRelativePathSegments, attachment.filename);
            attachment.attachableId = attachableId;
            const finalAbsolutePath = storagePublicAbsolutePath(attachment.relativePathSegments, attachment.filename);

            // copy file to create final directory
            copyFileSync(
                tempAbsolutePath,
                finalAbsolutePath,
            );
            unlinkSync(tempAbsolutePath);

            if (!attachment.library) continue;

            // manage attachment library
            const tempLibraryAbsolutePath = storagePublicAbsolutePath(attachment.library.relativePathSegments, attachment.library.filename);
            attachment.library.relativePathSegments = placesRelativePathSegments;
            attachment.library.url = storagePublicAbsoluteURL(placesRelativePathSegments, attachment.library.filename);
            const finalLibraryAbsolutePath = storagePublicAbsolutePath(attachment.library.relativePathSegments, attachment.library.filename);

            // copy library file to create final directory
            copyFileSync(
                tempLibraryAbsolutePath,
                finalLibraryAbsolutePath,
            );
            unlinkSync(tempLibraryAbsolutePath);

            uploadedAttachmentLibraries.push(attachment.library);
            uploadedAttachments.push(attachment);
        }

        if (uploadedAttachments.length > 0)
        {
            await this.commandBus.dispatch(new CommonCreateAttachmentsCommand(
                uploadedAttachments,
            ));
        }

        if (uploadedAttachmentLibraries.length > 0)
        {
            await this.commandBus.dispatch(new CommonCreateAttachmentLibrariesCommand(
                uploadedAttachmentLibraries,
            ));
        }
    }

    updateAttachments(
        attachments: CommonUpdateAttachmentByIdInput[],
    ): void
    {
        const attachmentPromises = [];
        for (const attachment of attachments)
        {
            if (attachment.isChanged)
            {
                attachmentPromises.push(
                    this.commandBus.dispatch(new CommonUpdateAttachmentByIdCommand(
                        attachment,
                    )),
                );
            }
        }

        if (attachmentPromises.length > 0) Promise.all(attachmentPromises);
    }
}
