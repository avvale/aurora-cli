import {
    CommonAttachment,
    CommonAttachmentFamilyFormat,
    CommonCreateAttachmentInput,
    CommonUpdateAttachmentByIdInput,
} from '@api/graphql';
import {
    CommonCreateAttachmentsCommand,
    CommonDeleteAttachmentsCommand,
    CommonGetAttachmentsQuery,
    CommonUpdateAttachmentByIdCommand,
} from '@app/common/attachment';
import { CommonGetAttachmentFamiliesQuery } from '@app/common/attachment-family';
import {
    CommonCreateAttachmentLibrariesCommand,
    CommonDeleteAttachmentLibrariesCommand,
} from '@app/common/attachment-library';
import {
    CoreGetSearchKeyLangService,
    ICommandBus,
    IQueryBus,
    QueryStatement,
    Utils,
    getRelativePathSegments,
    storagePublicAbsoluteDirectoryPath,
    storagePublicAbsolutePath,
    storagePublicAbsoluteURL,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { copyFileSync, existsSync, mkdirSync, unlinkSync } from 'node:fs';
import * as sharp from 'sharp';

@Injectable()
export class CommonAttachmentsService {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly coreGetSearchKeyLangService: CoreGetSearchKeyLangService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async createUploadedAttachments(
        attachableId: string,
        attachments: CommonCreateAttachmentInput[],
        relativePathSegments: string[],
    ): Promise<void> {
        // change extension of attachments if is required
        await this.changeAttachmentExtensions(
            // only attachments that are uploaded
            attachments.filter((attachment) => attachment.isUploaded),
        );

        const uploadedAttachmentLibraries = [];
        const uploadedAttachments = [];
        for (const attachment of attachments) {
            if (!attachment.isUploaded) continue;

            const absoluteDirectoryPath =
                storagePublicAbsoluteDirectoryPath(relativePathSegments);

            // create directory if not exists
            if (!existsSync(absoluteDirectoryPath))
                mkdirSync(absoluteDirectoryPath, { recursive: true });

            const tempAbsolutePath = storagePublicAbsolutePath(
                attachment.relativePathSegments,
                attachment.filename,
            );
            attachment.relativePathSegments = relativePathSegments;
            attachment.url = storagePublicAbsoluteURL(
                relativePathSegments,
                attachment.filename,
            );
            attachment.attachableId = attachableId;
            const finalAbsolutePath = storagePublicAbsolutePath(
                attachment.relativePathSegments,
                attachment.filename,
            );

            // copy file to create final directory
            copyFileSync(tempAbsolutePath, finalAbsolutePath);
            unlinkSync(tempAbsolutePath);

            if (!attachment.library) continue;

            // manage attachment library
            const tempLibraryAbsolutePath = storagePublicAbsolutePath(
                attachment.library.relativePathSegments,
                attachment.library.filename,
            );
            attachment.library.relativePathSegments = relativePathSegments;
            attachment.library.url = storagePublicAbsoluteURL(
                relativePathSegments,
                attachment.library.filename,
            );
            const finalLibraryAbsolutePath = storagePublicAbsolutePath(
                attachment.library.relativePathSegments,
                attachment.library.filename,
            );

            // copy library file to create final directory
            copyFileSync(tempLibraryAbsolutePath, finalLibraryAbsolutePath);
            unlinkSync(tempLibraryAbsolutePath);

            uploadedAttachmentLibraries.push(attachment.library);
            uploadedAttachments.push(attachment);
        }

        // only create sizes if attachment has been cropped
        (await this.createAttachmentsSizes(
            uploadedAttachments,
        )) as CommonCreateAttachmentInput[];

        if (uploadedAttachments.length > 0) {
            await this.commandBus.dispatch(
                new CommonCreateAttachmentsCommand(uploadedAttachments),
            );
        }

        if (uploadedAttachmentLibraries.length > 0) {
            await this.commandBus.dispatch(
                new CommonCreateAttachmentLibrariesCommand(
                    uploadedAttachmentLibraries,
                ),
            );
        }
    }

    async changeAttachmentExtensions(
        attachments:
            | CommonCreateAttachmentInput[]
            | CommonUpdateAttachmentByIdInput[],
    ): Promise<
        CommonCreateAttachmentInput[] | CommonUpdateAttachmentByIdInput[]
    > {
        // get all family ids from attachments
        const attachmentFamilyIds = attachments
            .filter((attachment) => attachment.isCropable)
            .filter((attachment) => Boolean(attachment.familyId))
            .map((attachment) => attachment.familyId);

        const attachmentFamilies = await this.queryBus.ask(
            new CommonGetAttachmentFamiliesQuery({
                where: {
                    id: attachmentFamilyIds,
                },
            }),
        );

        // checks that there is at least one attachment family with format property defined
        if (
            !attachmentFamilies.some(
                (attachmentFamily) => attachmentFamily.format,
            )
        )
            return attachments;

        for (const attachment of attachments) {
            if (!attachment.isCropable) continue;
            if (!attachment.familyId) continue;

            const attachmentFamily = attachmentFamilies.find(
                (attachmentFamily) =>
                    attachmentFamily.id === attachment.familyId,
            );

            if (!attachmentFamily.format) continue;
            if (
                Utils.mimeFromExtension(
                    attachmentFamily.format.toLowerCase(),
                ) === attachment.mimetype
            )
                continue;

            const absolutePath = storagePublicAbsolutePath(
                attachment.relativePathSegments,
                attachment.filename,
            );

            // add new extension parameters
            attachment.extension = `.${attachmentFamily.format.toLowerCase()}`;
            attachment.filename = `${attachment.id}${attachment.extension}`;
            const targetAbsolutePathTarget = storagePublicAbsolutePath(
                attachment.relativePathSegments,
                attachment.filename,
            );

            let image;
            switch (attachmentFamily.format) {
                case CommonAttachmentFamilyFormat.JPG:
                    image = sharp(absolutePath).jpeg({
                        quality: attachmentFamily.quality
                            ? attachmentFamily.quality
                            : 80,
                    });
                    break;
            }

            // save to file
            // eslint-disable-next-line no-await-in-loop
            const imageResult = await image.toFile(targetAbsolutePathTarget);
            unlinkSync(absolutePath);

            attachment.width = imageResult.width;
            attachment.height = imageResult.height;
            attachment.size = imageResult.size;
            attachment.url = storagePublicAbsoluteURL(
                attachment.relativePathSegments,
                attachment.filename,
            );
            attachment.mimetype = Utils.mimeFromExtension(
                attachmentFamily.format.toLowerCase(),
            );
        }

        return attachments;
    }

    async createAttachmentsSizes(
        attachments:
            | CommonCreateAttachmentInput[]
            | CommonUpdateAttachmentByIdInput[],
    ): Promise<
        CommonCreateAttachmentInput[] | CommonUpdateAttachmentByIdInput[]
    > {
        // get all family ids from attachments
        const attachmentFamilyIds = attachments
            .filter((attachment) => attachment.isCropable)
            .filter((attachment) => Boolean(attachment.familyId))
            .map((attachment) => attachment.familyId);

        // if there are no family attachments there can be no sizes
        if (attachmentFamilyIds.length === 0) return attachments;

        const attachmentFamilies = await this.queryBus.ask(
            new CommonGetAttachmentFamiliesQuery({
                where: {
                    id: attachmentFamilyIds,
                },
            }),
        );

        // checks that there is at least one attachment family with sizes
        if (
            !attachmentFamilies.some((attachmentFamily) =>
                Array.isArray(attachmentFamily.sizes),
            )
        )
            return attachments;

        for (const attachment of attachments) {
            if (!attachment.isCropable) continue;
            if (!attachment.isCropped) continue;
            if (!attachment.familyId) continue;

            const attachmentFamily = attachmentFamilies.find(
                (attachmentFamily) =>
                    attachmentFamily.id === attachment.familyId,
            );

            if (!Array.isArray(attachmentFamily.sizes)) continue;

            const sizes = [];
            for (const size of attachmentFamily.sizes) {
                const width = Math.round((attachment.width * size) / 100);
                const height = Math.round((attachment.height * size) / 100);
                const absolutePath = storagePublicAbsolutePath(
                    attachment.relativePathSegments,
                    attachment.filename,
                );

                // get paths for resized image
                const targetFilename = `${size}@_${attachment.filename}`;
                const targetAbsolutePathTarget = storagePublicAbsolutePath(
                    attachment.relativePathSegments,
                    targetFilename,
                );

                // resize image
                const image = sharp(absolutePath).resize({
                    width,
                    height,
                });

                // save to file
                // eslint-disable-next-line no-await-in-loop
                const imageResult = await image.toFile(
                    targetAbsolutePathTarget,
                );

                sizes.push({
                    resizePercentage: size,
                    filename: targetFilename,
                    relativePathSegments: attachment.relativePathSegments,
                    width: imageResult.width,
                    height: imageResult.height,
                    size: imageResult.size,
                    url: storagePublicAbsoluteURL(
                        attachment.relativePathSegments,
                        targetFilename,
                    ),
                });
            }

            attachment.sizes = sizes;
        }

        return attachments;
    }

    // update attachments data, like alt, title, family, etc.
    async updateAttachments(
        attachments: CommonUpdateAttachmentByIdInput[],
    ): Promise<void> {
        // only create sizes if attachment has been cropped
        (await this.createAttachmentsSizes(
            attachments,
        )) as CommonUpdateAttachmentByIdInput[];

        const attachmentPromises = [];
        for (const attachment of attachments) {
            if (attachment.isChanged && !attachment.isUploaded) {
                attachmentPromises.push(
                    this.commandBus.dispatch(
                        new CommonUpdateAttachmentByIdCommand(attachment),
                    ),
                );
            }
        }

        if (attachmentPromises.length > 0) Promise.all(attachmentPromises);
    }

    async duplicateAttachmentsForNewI18nObject(
        contentLanguage: string,
        i18nRelationship: string,
        constraint: QueryStatement,
        attachments: CommonAttachment[],
        tempRelativePathSegments: string[],
    ): Promise<CommonAttachment[]> {
        // get langs from cache manager, previously
        // loaded in coreGetLangs service
        const langs: {
            id: string;
            iso6392: string;
            iso6393: string;
            ietf: string;
        }[] = (await this.cacheManager.get('common/langs')) || [];

        // try get lang from content-language header
        const lang = langs.find(
            (lang) =>
                lang[this.coreGetSearchKeyLangService.get()] ===
                contentLanguage,
        );
        const i18nAssociation = constraint.include.find(
            (include) => include.association === i18nRelationship,
        );

        if (
            !(
                lang &&
                i18nAssociation?.where?.langId &&
                lang.id !== i18nAssociation.where.langId
            )
        )
            return [];

        // *********************************************
        // * duplicate attachments for new i18n object *
        // *********************************************
        const newAttachments = [];
        const targetRelativePathSegments = getRelativePathSegments(
            tempRelativePathSegments,
        );
        const targetAbsoluteDirectoryPath = storagePublicAbsoluteDirectoryPath(
            targetRelativePathSegments,
        );

        // create directory if not exists
        if (!existsSync(targetAbsoluteDirectoryPath))
            mkdirSync(targetAbsoluteDirectoryPath, { recursive: true });

        for (const attachment of attachments) {
            const newId = Utils.uuid();
            const newFilename = `${newId}${attachment.extension}`;
            const newUrl = storagePublicAbsoluteURL(
                tempRelativePathSegments,
                newFilename,
            );
            const newAttachment = {
                ...attachment,
                id: newId,
                filename: newFilename,
                relativePathSegments: tempRelativePathSegments,
                url: newUrl,
                isUploaded: true,
                sizes: null,
            };

            const sourceAbsoluteDirectoryAttachmentPath =
                storagePublicAbsolutePath(
                    attachment.relativePathSegments,
                    attachment.filename,
                );
            const tempAbsoluteAttachmentPath = storagePublicAbsolutePath(
                newAttachment.relativePathSegments,
                newAttachment.filename,
            );

            // copy attachment to temp directory
            copyFileSync(
                sourceAbsoluteDirectoryAttachmentPath,
                tempAbsoluteAttachmentPath,
            );

            // add new attachment to array
            newAttachments.push(newAttachment);

            // check if attachment has to duplicate library
            if (!attachment.library) continue;

            const newLibraryId = Utils.uuid();
            const newLibraryFilename = `${newLibraryId}${attachment.library.extension}`;
            const newLibraryUrl = storagePublicAbsoluteURL(
                tempRelativePathSegments,
                newLibraryFilename,
            );
            const newAttachmentLibrary = {
                ...attachment.library,
                id: newLibraryId,
                filename: newLibraryFilename,
                relativePathSegments: tempRelativePathSegments,
                url: newLibraryUrl,
            };

            const sourceAbsoluteDirectoryAttachmentLibraryPath =
                storagePublicAbsolutePath(
                    attachment.library.relativePathSegments,
                    attachment.library.filename,
                );
            const tempAbsoluteAttachmentLibraryPath = storagePublicAbsolutePath(
                newAttachmentLibrary.relativePathSegments,
                newAttachmentLibrary.filename,
            );

            // copy attachment to temp directory
            copyFileSync(
                sourceAbsoluteDirectoryAttachmentLibraryPath,
                tempAbsoluteAttachmentLibraryPath,
            );

            // add library to new attachment by reference
            newAttachment.library = newAttachmentLibrary;
            newAttachment.libraryId = newAttachmentLibrary.id;
            newAttachment.libraryFilename = newAttachmentLibrary.filename;
        }

        return newAttachments;
    }

    deleteAttachmentFile(attachment: CommonAttachment): void {
        // delete sizes
        if (Array.isArray(attachment.sizes)) {
            for (const size of attachment.sizes) {
                const absoluteAttachmentSizePath = storagePublicAbsolutePath(
                    size.relativePathSegments,
                    size.filename,
                );
                if (existsSync(absoluteAttachmentSizePath))
                    unlinkSync(absoluteAttachmentSizePath);
            }
        }

        // delete attachment
        const absoluteAttachmentPath = storagePublicAbsolutePath(
            attachment.relativePathSegments,
            attachment.filename,
        );
        if (existsSync(absoluteAttachmentPath))
            unlinkSync(absoluteAttachmentPath);

        if (attachment.library) {
            // delete attachment library
            const absoluteAttachmentLibraryPath = storagePublicAbsolutePath(
                attachment.library.relativePathSegments,
                attachment.library.filename,
            );
            if (existsSync(absoluteAttachmentLibraryPath))
                unlinkSync(absoluteAttachmentLibraryPath);
        }
    }

    async deleteAttachments(
        attachableId: string,
        langId?: string,
        fallbackLangId?: string,
    ): Promise<void> {
        const whereStatement = {
            attachableId,
        };

        if (langId && fallbackLangId && langId !== fallbackLangId) {
            // if the language is different from the default language,
            // we only delete attachments in that language.
            whereStatement['langId'] = langId;
        }

        const attachments = await this.queryBus.ask(
            new CommonGetAttachmentsQuery({
                include: [
                    {
                        association: 'library',
                    },
                ],
                where: whereStatement,
            }),
        );

        // delete all attachments files and libraries files
        for (const attachment of attachments) {
            this.deleteAttachmentFile(attachment);
        }

        // delete all attachments from database
        await this.commandBus.dispatch(
            new CommonDeleteAttachmentsCommand({
                where: whereStatement,
            }),
        );

        // delete all attachment libraries from database
        await this.commandBus.dispatch(
            new CommonDeleteAttachmentLibrariesCommand({
                where: {
                    id: attachments.map((attachment) => attachment.libraryId),
                },
            }),
        );
    }
}
