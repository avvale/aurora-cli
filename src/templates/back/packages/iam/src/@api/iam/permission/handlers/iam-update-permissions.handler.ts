import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetPermissionsQuery } from '@app/iam/permission/application/get/get-permissions.query';
import { UpdatePermissionsCommand } from '@app/iam/permission/application/update/update-permissions.command';
import { IamPermission, IamUpdatePermissionsInput } from '@api/graphql';
import { IamPermissionDto, IamUpdatePermissionsDto } from '../dto';

@Injectable()
export class IamUpdatePermissionsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdatePermissionsInput | IamUpdatePermissionsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermission | IamPermissionDto>
    {
        await this.commandBus.dispatch(new UpdatePermissionsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new GetPermissionsQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}