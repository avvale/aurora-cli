import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindRoleByIdQuery } from '../../../../@apps/iam/role/application/find/find-role-by-id.query';
import { UpdateRoleCommand } from '../../../../@apps/iam/role/application/update/update-role.command';
import { IamRole, IamUpdateRoleInput } from '../../../../graphql';
import { IamRoleDto, IamUpdateRoleDto } from '../dto';

@Injectable()
export class IamUpdateRoleHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRoleInput | IamUpdateRoleDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole | IamRoleDto>
    {
        await this.commandBus.dispatch(new UpdateRoleCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id, constraint, { timezone }));
    }
}