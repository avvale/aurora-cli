import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindPermissionByIdQuery } from '@apps/iam/permission/application/find/find-permission-by-id.query';
import { UpdatePermissionByIdCommand } from '@apps/iam/permission/application/update/update-permission-by-id.command';
import { IamPermission, IamUpdatePermissionByIdInput } from '../../../../graphql';
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
    ): Promise<IamPermission | IamPermissionDto>
    {
        await this.commandBus.dispatch(new UpdatePermissionByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id, constraint, { timezone }));
    }
}