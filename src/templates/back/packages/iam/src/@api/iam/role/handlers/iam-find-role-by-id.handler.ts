import { IamRole } from '@api/graphql';
import { IamRoleDto } from '@api/iam/role';
import { IamFindRoleByIdQuery } from '@app/iam/role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindRoleByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole | IamRoleDto> {
        return await this.queryBus.ask(
            new IamFindRoleByIdQuery(id, constraint, {
                timezone,
            }),
        );
    }
}
