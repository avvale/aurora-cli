import { IamRole, IamUpdateRolesInput } from '@api/graphql';
import { IamGetRolesQuery, IamUpdateRolesCommand } from '@app/iam/role';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateRolesHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRolesInput,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRole> {
        await this.commandBus.dispatch(
            new IamUpdateRolesCommand(payload, queryStatement, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return await this.queryBus.ask(
            new IamGetRolesQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
