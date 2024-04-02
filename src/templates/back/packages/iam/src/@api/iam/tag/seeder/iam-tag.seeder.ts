import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { IamCreateTagsCommand } from '@app/iam/tag';
import { iamMockTagData } from '@app/iam/tag';

@Injectable()
export class IamTagSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new IamCreateTagsCommand(
            iamMockTagData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
