import { IamRole } from '@api/graphql';
import { IamDeleteRolesCommand, IamGetRolesQuery } from '@app/iam/role';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteRolesHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRole[]> {
        const roles = await this.queryBus.ask(
            new IamGetRolesQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new IamDeleteRolesCommand(queryStatement, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return roles;
    }
}
