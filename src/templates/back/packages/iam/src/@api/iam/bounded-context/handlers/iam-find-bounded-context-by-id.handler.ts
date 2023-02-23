import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindBoundedContextByIdQuery } from '@app/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { IamBoundedContext } from '@api/graphql';
import { IamBoundedContextDto } from '../dto';

@Injectable()
export class IamFindBoundedContextByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        return await this.queryBus.ask(new FindBoundedContextByIdQuery(id, constraint, { timezone }));
    }
}