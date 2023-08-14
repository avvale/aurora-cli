import { IamUserMeta } from '@api/graphql';
import { IamFindUserByIdQuery } from '@app/iam/user';
import { IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
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
        return await this.queryBus.ask(new IamFindUserByIdQuery(
            id,
            {},
            {
                timezone,
            },
        ));
    }
}