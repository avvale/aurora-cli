import { CommonResourceDto } from '@api/common/resource';
import { CommonResource } from '@api/graphql';
import { CommonDeleteResourceByIdCommand, CommonFindResourceByIdQuery } from '@app/common/resource';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonDeleteResourceByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<CommonResource | CommonResourceDto>
    {
        const resource = await this.queryBus.ask(new CommonFindResourceByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new CommonDeleteResourceByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return resource;
    }
}
