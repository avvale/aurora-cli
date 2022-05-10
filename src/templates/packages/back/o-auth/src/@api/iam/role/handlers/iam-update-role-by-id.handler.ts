import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindRoleByIdQuery } from '@apps/iam/role/application/find/find-role-by-id.query';
import { UpdateRoleByIdCommand } from '@apps/iam/role/application/update/update-role-by-id.command';
import { IamRole, IamUpdateRoleByIdInput } from '../../../../graphql';
import { IamRoleDto, IamUpdateRoleByIdDto } from '../dto';

@Injectable()
export class IamUpdateRoleByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRoleByIdInput | IamUpdateRoleByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole | IamRoleDto>
    {
        await this.commandBus.dispatch(new UpdateRoleByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id, constraint, { timezone }));
    }
}