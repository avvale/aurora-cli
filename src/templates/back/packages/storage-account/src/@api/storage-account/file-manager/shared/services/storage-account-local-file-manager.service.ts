/* eslint-disable max-len */
import { StorageAccountFileManagerBase64, StorageAccountFileManagerFile, StorageAccountFileManagerFileInput, StorageAccountFileManagerFileUploadedInput } from '@api/graphql';
import { Fs, getRelativePathSegments, storagePublicAbsoluteDirectoryPath, storagePublicAbsolutePath, storagePublicAbsoluteURL, storageStream, uuid } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { extname } from 'node:path';
import * as sharp from 'sharp';
import { StorageAccountFileManagerService } from './storage-account-file-manager.service';

@Injectable()
export class StorageAccountLocalFileManagerService implements StorageAccountFileManagerService
{
    copy(
        src: StorageAccountFileManagerFileInput,
        dest: StorageAccountFileManagerFileInput,
    ): void
    {
        const srcAbsolutePath = Fs.storagePublicAbsolutePath(src.relativePathSegments, src.filename);
        const destAbsolutePath = storagePublicAbsolutePath(dest.relativePathSegments, dest.filename);

        copyFileSync(
            srcAbsolutePath,
            destAbsolutePath,
        );
    }

    deleteFile(
        filePayload: StorageAccountFileManagerFileInput,
    ): void
    {
        const absoluteFilePath = Fs.storagePublicAbsolutePath(filePayload.relativePathSegments, filePayload.filename);
        if (existsSync(absoluteFilePath))
        {
            unlinkSync(absoluteFilePath);
        }
    }

    getBase64File(
        filePayload: StorageAccountFileManagerFileInput,
    ): StorageAccountFileManagerBase64
    {
        if (!filePayload.filename) throw new BadRequestException('Filename to create blob must be defined');
        if (!Array.isArray(filePayload.relativePathSegments)) throw new BadRequestException('RelativePathSegments to create blob must be defined and must be an array, current value: ' + JSON.stringify(filePayload.relativePathSegments));

        const absoluteAttachmentPath = storagePublicAbsolutePath(filePayload.relativePathSegments, filePayload.filename);
        if (existsSync(absoluteAttachmentPath))
        {
            const fileData = readFileSync(absoluteAttachmentPath);
            const buffer = Buffer.from(fileData);
            return {
                base64: buffer.toString('base64'),
            };
        }

        throw new BadRequestException('Not found attachment file ' + absoluteAttachmentPath);
    }

    getBase64Files(
        filePayloads: StorageAccountFileManagerFileInput[],
    ): StorageAccountFileManagerBase64[]
    {
        const responses = [];
        for (const filePayload of filePayloads)
        {
            responses.push(this.getBase64File(filePayload));
        }
        return responses;
    }

    async uploadFile(
        filePayload: StorageAccountFileManagerFileUploadedInput,
    ): Promise<StorageAccountFileManagerFile>
    {
        // by default all files are saved in the tmp folder, so that after manipulation they are saved in the corresponding folder
        // if it is not necessary to manipulate the file, it can be saved directly in the corresponding folder.
        const relativePathSegments = getRelativePathSegments(filePayload.relativePathSegments);
        const absoluteDirectoryPath = storagePublicAbsoluteDirectoryPath(relativePathSegments);

        const { createReadStream, filename: originFilename, mimetype, encoding } = await filePayload.file;
        const extensionFile = extname(originFilename).toLowerCase() === '.jpeg' ? '.jpg' : extname(originFilename).toLowerCase();
        const filename = `${filePayload.id}${extensionFile}`;
        const absolutePath = storagePublicAbsolutePath(relativePathSegments, filename);

        // create directory if not exists
        if (!existsSync(absoluteDirectoryPath)) mkdirSync(absoluteDirectoryPath, { recursive: true });

        // Create readable stream
        const stream = createReadStream();

        // promise to store the file in the filesystem.
        // no await here to allow parallel uploads
        await storageStream(absolutePath, stream);

        // return the file url
        const url = storagePublicAbsoluteURL(relativePathSegments, filename);
        const stats = statSync(absolutePath);

        // check if file can do a crop action
        const isCropable = mimetype === 'image/jpeg' || mimetype === 'image/png' || mimetype === 'image/gif' || mimetype === 'image/webp';

        const storageAccountFile: StorageAccountFileManagerFile = {
            id        : filePayload.id,
            originFilename,
            filename,
            mimetype,
            extension : extensionFile,
            relativePathSegments,
            size      : stats.size,
            url,
            isCropable,
            isUploaded: true,
            meta      : {
                fileMeta: isCropable ? await sharp(absolutePath).metadata() : stats,
            },
        };

        // add cropable properties
        if (isCropable && filePayload.hasCreateLibrary)
        {
            const libraryId = uuid();
            const filename = `${libraryId}${storageAccountFile.extension}`;
            storageAccountFile.libraryId = libraryId;
            storageAccountFile.libraryFilename = filename;
            const absoluteLibraryPath = storagePublicAbsolutePath(relativePathSegments, filename);

            // copy file to create a library file
            copyFileSync(
                absolutePath,
                absoluteLibraryPath,
            );

            // set storageAccountFile properties from cropable file
            storageAccountFile.width = storageAccountFile.meta.fileMeta.width;
            storageAccountFile.height = storageAccountFile.meta.fileMeta.height;
            storageAccountFile.library = {
                id                  : libraryId,
                originFilename,
                filename,
                mimetype,
                extension           : extensionFile,
                relativePathSegments: storageAccountFile.relativePathSegments,
                width               : storageAccountFile.meta.fileMeta.width,
                height              : storageAccountFile.meta.fileMeta.height,
                size                : storageAccountFile.size,
                url                 : storagePublicAbsoluteURL(relativePathSegments, filename),
                meta                : {
                    fileMeta: storageAccountFile.meta.fileMeta,
                },
            };
        }

        return storageAccountFile;
    }

    async uploadFiles(
        filePayloads: StorageAccountFileManagerFileUploadedInput[],
    ): Promise<StorageAccountFileManagerFile[]>
    {
        const responses = [];
        for (const filePayload of filePayloads)
        {
            const savedFile = this.uploadFile(filePayload);
            responses.push(savedFile);
        }
        return Promise.all(responses);
    }
}
