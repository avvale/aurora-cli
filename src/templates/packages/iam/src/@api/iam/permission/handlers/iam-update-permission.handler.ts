import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindPermissionByIdQuery } from '../../../../@apps/iam/permission/application/find/find-permission-by-id.query';
import { UpdatePermissionCommand } from '../../../../@apps/iam/permission/application/update/update-permission.command';
import { IamPermission, IamUpdatePermissionInput } from '../../../../graphql';
import { IamPermissionDto, IamUpdatePermissionDto } from '../dto';

@Injectable()
export class IamUpdatePermissionHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdatePermissionInput | IamUpdatePermissionDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermission | IamPermissionDto>
    {
        await this.commandBus.dispatch(new UpdatePermissionCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id, constraint, { timezone }));
    }
}