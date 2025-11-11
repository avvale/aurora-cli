import { IamRole } from '@api/graphql';
import { IamRoleDto } from '@api/iam/role';
import { IamGetRolesQuery } from '@app/iam/role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamGetRolesHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole[] | IamRoleDto[]> {
        return await this.queryBus.ask(
            new IamGetRolesQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
