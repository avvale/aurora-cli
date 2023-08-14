import { CommonResourceDto } from '@api/common/resource';
import { CommonResource } from '@api/graphql';
import { CommonFindResourceByIdQuery } from '@app/common/resource';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindResourceByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonResource | CommonResourceDto>
    {
        return await this.queryBus.ask(new CommonFindResourceByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
