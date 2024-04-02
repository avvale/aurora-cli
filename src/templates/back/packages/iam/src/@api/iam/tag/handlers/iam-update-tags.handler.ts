import { IamTag, IamUpdateTagsInput } from '@api/graphql';
import { IamTagDto, IamUpdateTagsDto } from '@api/iam/tag';
import { IamGetTagsQuery, IamUpdateTagsCommand } from '@app/iam/tag';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateTagsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTagsInput | IamUpdateTagsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTag | IamTagDto>
    {
        await this.commandBus.dispatch(new IamUpdateTagsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamGetTagsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
