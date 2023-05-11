import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindRoleByIdQuery } from '@app/iam/role/application/find/find-role-by-id.query';
import { DeleteRoleByIdCommand } from '@app/iam/role/application/delete/delete-role-by-id.command';
import { IamRole } from '@api/graphql';
import { IamRoleDto } from '../dto';

@Injectable()
export class IamDeleteRoleByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRole | IamRoleDto>
    {
        const role = await this.queryBus.ask(new FindRoleByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRoleByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return role;
    }
}