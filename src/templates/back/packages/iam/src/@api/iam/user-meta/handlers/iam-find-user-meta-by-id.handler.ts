import { Injectable } from '@nestjs/common';
import { IQueryBus } from '@aurora-ts/core';

// @app
import { FindUserByIdQuery } from '@app/iam/user/application/find/find-user-by-id.query';
import { IamUserMeta } from '@api/graphql';
import { IamUserMetaDto } from '../dto';

@Injectable()
export class IamFindUserMetaByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        timezone?: string,
    ): Promise<IamUserMeta | IamUserMetaDto>
    {
        return await this.queryBus.ask(new FindUserByIdQuery(id, {}, { timezone }));
    }
}