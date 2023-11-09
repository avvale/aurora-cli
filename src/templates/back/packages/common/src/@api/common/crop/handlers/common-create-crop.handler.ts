import { CommonCreateAttachmentDto } from '@api/common/attachment';
import { CommonCropPropertiesDto } from '@api/common/crop';
import { CommonCreateAttachmentInput, CommonCreatedCrop, CommonCropPropertiesInput } from '@api/graphql';
import { CommonFindAttachmentFamilyByIdQuery } from '@app/common/attachment-family';
import { IQueryBus, storagePublicAbsolutePath } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class CommonCreateCropHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        crop: CommonCropPropertiesInput | CommonCropPropertiesDto,
        attachment: CommonCreateAttachmentInput | CommonCreateAttachmentDto,
    ): Promise<CommonCreatedCrop>
    {
        const attachmentFamily = await this.queryBus.ask(new CommonFindAttachmentFamilyByIdQuery(
            attachment.familyId,
        ));

        // TODO, ver dodne ponemos el cambio de extension, posiblemente guardadeo de attachemtn
        /*  if (Utils.mimeFromExtension(attachmentFamily.format.toLowerCase()) !== payload.attachment.mimetype)
        {
            console.log('mimetype not match');
        } */

        // get library paths
        const libraryFilename = `${attachment.library.id}${attachment.library.extension}`;
        const absoluteLibraryPath = storagePublicAbsolutePath(attachment.library.relativePathSegments, libraryFilename);

        // get paths
        const filename = `${attachment.id}${attachment.extension}`;
        const absolutePath =  storagePublicAbsolutePath(attachment.relativePathSegments, filename);

        // crop image
        const image = sharp(absoluteLibraryPath)
            .extract({
                left  : crop.x,
                top   : crop.y,
                width : crop.width,
                height: crop.height,
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

        // set metadata for cropped image
        const meta = await sharp(absolutePath).metadata();

        return {
            attachment: {
                ...attachment,
                width : imageResult.width,
                height: imageResult.height,
                size  : imageResult.size,
                meta,
            },
            crop,
        };
    }
}