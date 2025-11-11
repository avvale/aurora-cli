import { iamMockTagData, IamTag } from '@app/iam/tag';
import {
    IamTagCreatedAt,
    IamTagDeletedAt,
    IamTagId,
    IamTagName,
    IamTagRowId,
    IamTagUpdatedAt,
} from '@app/iam/tag/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class IamMockTagSeeder extends MockSeeder<IamTag> {
    public collectionSource: IamTag[];

    constructor() {
        super();
        this._createMock();
    }

    private _createMock(): void {
        this.collectionSource = [];

        for (const tag of _.orderBy(iamMockTagData, ['id'])) {
            this.collectionSource.push(
                IamTag.register(
                    new IamTagId(tag.id),
                    new IamTagRowId(tag.rowId),
                    new IamTagName(tag.name),
                    new IamTagCreatedAt({ currentTimestamp: true }),
                    new IamTagUpdatedAt({ currentTimestamp: true }),
                    new IamTagDeletedAt(null),
                ),
            );
        }
    }
}
