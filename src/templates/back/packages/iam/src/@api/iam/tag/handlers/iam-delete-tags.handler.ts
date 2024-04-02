import { IamTag } from '@api/graphql';
import { IamTagDto } from '@api/iam/tag';
import { IamDeleteTagsCommand, IamGetTagsQuery } from '@app/iam/tag';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteTagsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTag[] | IamTagDto[]>
    {
        const tags = await this.queryBus.ask(new IamGetTagsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new IamDeleteTagsCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return tags;
    }
}
