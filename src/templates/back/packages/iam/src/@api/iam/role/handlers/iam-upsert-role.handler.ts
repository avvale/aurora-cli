import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindRoleByIdQuery } from '@app/iam/role/application/find/find-role-by-id.query';
import { UpsertRoleCommand } from '@app/iam/role/application/upsert/upsert-role.command';
import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';
import { IamRoleDto, IamUpdateRoleByIdDto } from '../dto';

@Injectable()
export class IamUpsertRoleHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRoleByIdInput | IamUpdateRoleByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRole | IamRoleDto>
    {
        await this.commandBus.dispatch(new UpsertRoleCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindRoleByIdQuery(
            payload.id,
            {},
            { timezone },
        ));
    }
}