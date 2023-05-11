import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetRolesQuery } from '@app/iam/role/application/get/get-roles.query';
import { UpdateRolesCommand } from '@app/iam/role/application/update/update-roles.command';
import { IamRole, IamUpdateRolesInput } from '@api/graphql';
import { IamRoleDto, IamUpdateRolesDto } from '../dto';

@Injectable()
export class IamUpdateRolesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRolesInput | IamUpdateRolesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRole | IamRoleDto>
    {
        await this.commandBus.dispatch(new UpdateRolesCommand(
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

        return await this.queryBus.ask(new GetRolesQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}