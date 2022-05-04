import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindBoundedContextByIdQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { IamBoundedContext } from '../../../../graphql';
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