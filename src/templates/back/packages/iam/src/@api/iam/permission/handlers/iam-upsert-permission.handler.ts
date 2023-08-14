import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';
import { IamPermissionDto, IamUpdatePermissionByIdDto } from '@api/iam/permission';
import { IamFindPermissionByIdQuery, IamUpsertPermissionCommand } from '@app/iam/permission';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpsertPermissionHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdatePermissionByIdInput | IamUpdatePermissionByIdDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermission | IamPermissionDto>
    {
        await this.commandBus.dispatch(new IamUpsertPermissionCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindPermissionByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
