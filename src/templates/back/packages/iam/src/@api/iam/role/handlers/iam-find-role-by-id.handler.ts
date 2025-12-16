import { IamRole } from '@api/graphql';
import { IamFindRoleByIdQuery } from '@app/iam/role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindRoleByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole> {
        const role = await this.queryBus.ask(
            new IamFindRoleByIdQuery(id, constraint, {
                timezone,
            }),
        );

        if (!role) {
            throw new NotFoundException(`IamRole with id: ${id}, not found`);
        }

        return role;
    }
}
