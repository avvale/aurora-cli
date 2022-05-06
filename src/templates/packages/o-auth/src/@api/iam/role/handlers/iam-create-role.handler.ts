import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { FindRoleByIdQuery } from '../../../../@apps/iam/role/application/find/find-role-by-id.query';
import { CreateRoleCommand } from '../../../../@apps/iam/role/application/create/create-role.command';
import { IamRole, IamCreateRoleInput } from '../../../../graphql';
import { IamRoleDto, IamCreateRoleDto } from '../dto';

@Injectable()
export class IamCreateRoleHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreateRoleInput | IamCreateRoleDto,
        timezone?: string,
    ): Promise<IamRole | IamRoleDto>
    {
        await this.commandBus.dispatch(new CreateRoleCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id, {}, { timezone }));
    }
}