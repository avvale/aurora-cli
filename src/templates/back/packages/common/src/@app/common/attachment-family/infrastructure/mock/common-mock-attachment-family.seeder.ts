import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    CommonAttachmentFamilyId,
    CommonAttachmentFamilyResourceId,
    CommonAttachmentFamilyName,
    CommonAttachmentFamilyWidth,
    CommonAttachmentFamilyHeight,
    CommonAttachmentFamilyFitType,
    CommonAttachmentFamilyQuality,
    CommonAttachmentFamilySizes,
    CommonAttachmentFamilyFormat,
    CommonAttachmentFamilyCreatedAt,
    CommonAttachmentFamilyUpdatedAt,
    CommonAttachmentFamilyDeletedAt,
} from '../../domain/value-objects';
import { CommonAttachmentFamily } from '../../domain/common-attachment-family.aggregate';
import { commonMockAttachmentFamilyData } from './common-mock-attachment-family.data';
import * as _ from 'lodash';

@Injectable()
export class CommonMockAttachmentFamilySeeder extends MockSeeder<CommonAttachmentFamily>
{
    public collectionSource: CommonAttachmentFamily[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const attachmentFamily of _.orderBy(commonMockAttachmentFamilyData, ['id']))
        {
            this.collectionSource.push(
                CommonAttachmentFamily.register(
                    new CommonAttachmentFamilyId(attachmentFamily.id),
                    new CommonAttachmentFamilyResourceId(attachmentFamily.resourceId),
                    new CommonAttachmentFamilyName(attachmentFamily.name),
                    new CommonAttachmentFamilyWidth(attachmentFamily.width),
                    new CommonAttachmentFamilyHeight(attachmentFamily.height),
                    new CommonAttachmentFamilyFitType(attachmentFamily.fitType),
                    new CommonAttachmentFamilyQuality(attachmentFamily.quality),
                    new CommonAttachmentFamilySizes(attachmentFamily.sizes),
                    new CommonAttachmentFamilyFormat(attachmentFamily.format),
                    new CommonAttachmentFamilyCreatedAt({ currentTimestamp: true }),
                    new CommonAttachmentFamilyUpdatedAt({ currentTimestamp: true }),
                    new CommonAttachmentFamilyDeletedAt(null),
                ),
            );
        }
    }
}
