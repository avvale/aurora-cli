import { CommonAttachmentDto } from '../dto';
import { CommonAttachmentInput } from '@api/graphql';
import { storagePublicAbsolutePath } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'node:fs';

@Injectable()
export class CommonCreateBlobAttachmentHandler
{
    async main(
        payload: CommonAttachmentInput | CommonAttachmentDto,
    ): Promise<string>
    {
        const absoluteAttachmentPath = storagePublicAbsolutePath(payload.relativePathSegments, payload.filename);
        if (existsSync(absoluteAttachmentPath))
        {
            const fileData = readFileSync(absoluteAttachmentPath);
            const buffer = Buffer.from(fileData);
            return buffer.toString('base64');
        }

        throw new BadRequestException('Not found attachment file ' + absoluteAttachmentPath);
    }
}