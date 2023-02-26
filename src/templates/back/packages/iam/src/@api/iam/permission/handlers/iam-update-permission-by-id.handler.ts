import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurora-ts/core';

// @app
import { FindPermissionByIdQuery } from '@app/iam/permission/application/find/find-permission-by-id.query';
import { UpdatePermissionByIdCommand } from '@app/iam/permission/application/update/update-permission-by-id.command';
import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';
import { IamPermissionDto, IamUpdatePermissionByIdDto } from '../dto';

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
        const permission = await this.queryBus.ask(new FindPermissionByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));

        const dataToUpdate = Utils.diff(payload, permission);

        await this.commandBus.dispatch(new UpdatePermissionByIdCommand(
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

        return await this.queryBus.ask(new FindPermissionByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));
    }
}