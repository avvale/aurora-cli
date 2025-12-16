import { IamRole } from '@api/graphql';
import { IamFindRoleQuery } from '@app/iam/role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindRoleHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole> {
        const role = await this.queryBus.ask(
            new IamFindRoleQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        if (!role) {
            throw new NotFoundException(`IamRole not found`);
        }

        return role;
    }
}
