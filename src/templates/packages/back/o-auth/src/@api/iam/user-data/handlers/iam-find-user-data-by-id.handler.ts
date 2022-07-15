import { Injectable } from '@nestjs/common';
import { IQueryBus } from 'aurora-ts-core';

// @apps
import { FindUserByIdQuery } from '@apps/iam/user/application/find/find-user-by-id.query';
import { IamUserData } from '../../../../graphql';
import { IamUserDataDto } from '../dto';

@Injectable()
export class IamFindUserDataByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        timezone?: string,
    ): Promise<IamUserData | IamUserDataDto>
    {
        return await this.queryBus.ask(new FindUserByIdQuery(id, {}, { timezone }));
    }
}