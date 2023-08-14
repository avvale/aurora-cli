import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CommonCreateAttachmentFamiliesCommand } from '@app/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';

@Injectable()
export class CommonAttachmentFamilySeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateAttachmentFamiliesCommand(
            commonMockAttachmentFamilyData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
