import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';
import { IamPermissionDto, IamUpdatePermissionByIdDto } from '@api/iam/permission';
import { IamFindPermissionByIdQuery, IamUpdatePermissionByIdCommand } from '@app/iam/permission';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdatePermissionByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdatePermissionByIdInput | IamUpdatePermissionByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermission | IamPermissionDto>
    {
        const permission = await this.queryBus.ask(new IamFindPermissionByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, permission);

        await this.commandBus.dispatch(new IamUpdatePermissionByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindPermissionByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
