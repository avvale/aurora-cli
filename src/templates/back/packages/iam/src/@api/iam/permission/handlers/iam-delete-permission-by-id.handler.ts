import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindPermissionByIdQuery } from '@app/iam/permission/application/find/find-permission-by-id.query';
import { DeletePermissionByIdCommand } from '@app/iam/permission/application/delete/delete-permission-by-id.command';
import { IamPermission } from '@api/graphql';
import { IamPermissionDto } from '../dto';

@Injectable()
export class IamDeletePermissionByIdHandler
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
    ): Promise<IamPermission | IamPermissionDto>
    {
        const permission = await this.queryBus.ask(new FindPermissionByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePermissionByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return permission;
    }
}