import { CoreFile, CoreFileUploaded } from '@api/graphql';
import { Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class CoreFileUploaderService
{
    async uploadFile(file: CoreFileUploaded): Promise<CoreFile>
    {
        const directoryPath = Array.isArray(file.relativePathSegments) &&  file.relativePathSegments.length > 0 ?
            join(process.cwd(), 'storage', 'app', ...file.relativePathSegments) :
            join(process.cwd(), 'storage', 'app', 'tmp');

        // eslint-disable-next-line no-await-in-loop
        const { createReadStream, filename, mimetype, encoding } = await file.file;
        const path = join(
            directoryPath,
            `${file.id}-${filename}`,
        );

        // create directory if not exists
        if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath, { recursive: true });

        // Create readable stream
        const stream = createReadStream();

        // promise to store the file in the filesystem.
        // no await here to allow parallel uploads
        Utils.storageStream(path, stream);

        return {
            id: file.id,
            filename,
            mimetype,
            encoding,
        };
    }

    async uploadFiles(files: CoreFileUploaded[]): Promise<CoreFile[]>
    {
        const responses = [];

        for (const file of files)
        {
            responses.push(this.uploadFile(file));
        }

        return responses;
    }
}