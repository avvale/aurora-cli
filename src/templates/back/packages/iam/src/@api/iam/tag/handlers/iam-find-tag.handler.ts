import { IamTag } from '@api/graphql';
import { IamTagDto } from '@api/iam/tag';
import { IamFindTagQuery } from '@app/iam/tag';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindTagHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamTag | IamTagDto>
    {
        return await this.queryBus.ask(new IamFindTagQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
