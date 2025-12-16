import {
    IamPermissionRole,
    IamUpdatePermissionsRolesInput,
} from '@api/graphql';
import {
    IamGetPermissionsRolesQuery,
    IamUpdatePermissionsRolesCommand,
} from '@app/iam/permission-role';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdatePermissionsRolesHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdatePermissionsRolesInput,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermissionRole> {
        await this.commandBus.dispatch(
            new IamUpdatePermissionsRolesCommand(
                payload,
                queryStatement,
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        return await this.queryBus.ask(
            new IamGetPermissionsRolesQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
