import { CommonAttachment, CommonCreateAttachmentInput, CommonUpdateAttachmentByIdInput } from '@api/graphql';
import { CommonCreateAttachmentsCommand, CommonUpdateAttachmentByIdCommand } from '@app/common/attachment';
import { CommonGetAttachmentFamiliesQuery } from '@app/common/attachment-family';
import { CommonCreateAttachmentLibrariesCommand } from '@app/common/attachment-library';
import { ICommandBus, IQueryBus, storagePublicAbsoluteDirectoryPath, storagePublicAbsolutePath, storagePublicAbsoluteURL } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { copyFileSync, existsSync, mkdirSync, unlinkSync } from 'node:fs';
import * as sharp from 'sharp';

@Injectable()
export class CommonAttachmentsService
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async createUploadedAttachments(
        attachableId: string,
        attachments: CommonCreateAttachmentInput[],
        placesRelativePathSegments: string[],
    ): Promise<void>
    {
        const uploadedAttachmentLibraries = [];
        const uploadedAttachments = [];
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

        const uploadedAttachmentsWithSizes = await this.createAttachmentsSizes(uploadedAttachments);

        if (uploadedAttachmentsWithSizes.length > 0)
        {
            await this.commandBus.dispatch(new CommonCreateAttachmentsCommand(
                uploadedAttachmentsWithSizes,
            ));
        }

        if (uploadedAttachmentLibraries.length > 0)
        {
            await this.commandBus.dispatch(new CommonCreateAttachmentLibrariesCommand(
                uploadedAttachmentLibraries,
            ));
        }
    }

    async createAttachmentsSizes(
        attachments: CommonCreateAttachmentInput[],
    ): Promise<CommonCreateAttachmentInput[]>
    {
        const attachmentFamilyIds = attachments
            .filter(attachment => attachment.isUploaded)
            .filter(attachment => attachment.isCropable)
            .filter(attachment => Boolean(attachment.familyId))
            .map(attachment => attachment.familyId);

        // if there are no family attachments there can be no sizes
        if (attachmentFamilyIds.length === 0) return attachments;

        const attachmentFamilies = await this.queryBus.ask(new CommonGetAttachmentFamiliesQuery(
            {
                where: {
                    id: attachmentFamilyIds,
                },
            },
        ));

        // checks that there is at least one attachment family with sizes
        if (!attachmentFamilies.some(attachmentFamily => Array.isArray(attachmentFamily.sizes))) return attachments;

        for (const attachment of attachments)
        {
            if (!attachment.isUploaded) continue;
            if (!attachment.isCropable) continue;
            if (!attachment.familyId) continue;

            // eslint-disable-next-line no-await-in-loop
            const attachmentFamily = attachmentFamilies.find(attachmentFamily => attachmentFamily.id === attachment.familyId);

            if (Array.isArray(attachmentFamily.sizes))
            {
                const sizes = [];
                for (const size of attachmentFamily.sizes)
                {
                    const width = Math.round(attachment.width * size / 100);
                    const height = Math.round(attachment.height * size / 100);
                    const absolutePath = storagePublicAbsolutePath(attachment.relativePathSegments, attachment.filename);

                    // get paths for resized image
                    const targetFilename = `${size}@_${attachment.filename}`;
                    const targetAbsolutePathTarget = storagePublicAbsolutePath(attachment.relativePathSegments, targetFilename);

                    // resize image
                    const image = sharp(absolutePath)
                        .resize({
                            width,
                            height,
                        });

                    // save to file
                    // eslint-disable-next-line no-await-in-loop
                    const imageResult = await image.toFile(targetAbsolutePathTarget);

                    sizes.push({
                        resizePercentage    : size,
                        filename            : targetFilename,
                        relativePathSegments: attachment.relativePathSegments,
                        width               : imageResult.width,
                        height              : imageResult.height,
                        size                : imageResult.size,
                        url                 : storagePublicAbsoluteURL(attachment.relativePathSegments, targetFilename),
                    });
                }

                attachment.sizes = sizes;
            }
        }

        return attachments;
    }

    updateAttachments(
        attachments: CommonUpdateAttachmentByIdInput[],
    ): void
    {
        const attachmentPromises = [];
        for (const attachment of attachments)
        {
            if (attachment.isChanged && !attachment.isUploaded)
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

    deleteAttachment(
        attachment: CommonAttachment,
    ): void
    {
        // delete sizes
        if (Array.isArray(attachment.sizes))
        {
            for (const size of attachment.sizes)
            {
                const absoluteAttachmentSizePath = storagePublicAbsolutePath(size.relativePathSegments, size.filename);
                if (existsSync(absoluteAttachmentSizePath)) unlinkSync(absoluteAttachmentSizePath);
            }
        }

        // delete attachment
        const absoluteAttachmentPath = storagePublicAbsolutePath(attachment.relativePathSegments, attachment.filename);
        if (existsSync(absoluteAttachmentPath)) unlinkSync(absoluteAttachmentPath);

        if (attachment.library)
        {
            // delete attachment library
            const absoluteAttachmentLibraryPath = storagePublicAbsolutePath(attachment.library.relativePathSegments, attachment.library.filename);
            if (existsSync(absoluteAttachmentLibraryPath)) unlinkSync(absoluteAttachmentLibraryPath);
        }
    }
}
