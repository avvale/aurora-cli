import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindPermissionByIdQuery } from '../../../../@apps/iam/permission/application/find/find-permission-by-id.query';
import { DeletePermissionByIdCommand } from '../../../../@apps/iam/permission/application/delete/delete-permission-by-id.command';
import { IamPermission } from '../../../../graphql';
import { IamPermissionDto } from '../dto';

@Injectable()
export class IamDeletePermissionByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermission | IamPermissionDto>
    {
        const permission = await this.queryBus.ask(new FindPermissionByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePermissionByIdCommand(id, constraint, { timezone }));

        return permission;
    }
}