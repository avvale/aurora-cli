import { CommonCropAndCreateAttachment, CommonCropAndCreateAttachmentInput } from '@api/graphql';
import { CommonFindAttachmentFamilyByIdQuery } from '@app/common/attachment-family';
import { IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import * as sharp from 'sharp';
import { CommonCropAndCreateAttachmentDto } from '../dto';

@Injectable()
export class CommonCropAttachmentHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonCropAndCreateAttachmentInput | CommonCropAndCreateAttachmentDto,
    ): Promise<CommonCropAndCreateAttachment>
    {
        const attachmentFamily = await this.queryBus.ask(new CommonFindAttachmentFamilyByIdQuery(
            payload.attachment.familyId,
        ));

        // TODO, ver dodne ponemos el cambio de extension, posiblemente guardadeo de attachemtn
       /*  if (Utils.mimeFromExtension(attachmentFamily.format.toLowerCase()) !== payload.attachment.mimetype)
        {
            console.log('mimetype not match');
        } */

        // get library paths
        const absoluteLibraryPathDirectory = join(process.cwd(), 'storage', 'app', ...payload.attachment.library.relativePathSegments);
        const absoluteLibraryPath = join(absoluteLibraryPathDirectory, `${payload.attachment.library.id}${payload.attachment.library.extension}`);

        // get library paths
        const absolutePathDirectory = join(process.cwd(), 'storage', 'app', ...payload.attachment.relativePathSegments);
        const absolutePath = join(absolutePathDirectory, `${payload.attachment.id}${payload.attachment.extension}`);

        // crop image
        const image = sharp(absoluteLibraryPath)
            .extract({
                left  : payload.crop.x,
                top   : payload.crop.y,
                width : payload.crop.width,
                height: payload.crop.height,
            });

        if (attachmentFamily.width > 0 && attachmentFamily.height > 0)
        {
            image.resize({
                width : attachmentFamily.width,
                height: attachmentFamily.height,
            });
        }

        // save to file
        const imageResult = await image.toFile(absolutePath);

        return {
            attachment: {
                ...payload.attachment,
                width : imageResult.width,
                height: imageResult.height,
                size  : imageResult.size,
            },
            crop: payload.crop,
        };
    }
}