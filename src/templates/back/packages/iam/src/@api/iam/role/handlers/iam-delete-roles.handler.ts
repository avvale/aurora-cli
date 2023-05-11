import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetRolesQuery } from '@app/iam/role/application/get/get-roles.query';
import { DeleteRolesCommand } from '@app/iam/role/application/delete/delete-roles.command';
import { IamRole } from '@api/graphql';
import { IamRoleDto } from '../dto';

@Injectable()
export class IamDeleteRolesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRole[] | IamRoleDto[]>
    {
        const roles = await this.queryBus.ask(new GetRolesQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRolesCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return roles;
    }
}