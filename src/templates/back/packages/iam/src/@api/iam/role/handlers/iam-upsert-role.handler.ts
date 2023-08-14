import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';
import { IamRoleDto, IamUpdateRoleByIdDto } from '@api/iam/role';
import { IamFindRoleByIdQuery, IamUpsertRoleCommand } from '@app/iam/role';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        await this.commandBus.dispatch(new IamUpsertRoleCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindRoleByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
