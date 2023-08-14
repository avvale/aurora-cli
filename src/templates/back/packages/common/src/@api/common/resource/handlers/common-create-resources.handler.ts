import { CommonCreateResourceDto } from '@api/common/resource';
import { CommonCreateResourceInput } from '@api/graphql';
import { CommonCreateResourcesCommand } from '@app/common/resource';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCreateResourcesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: CommonCreateResourceInput[] | CommonCreateResourceDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CommonCreateResourcesCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return true;
    }
}
