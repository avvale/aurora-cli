import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindRoleByIdQuery } from '@app/iam/role/application/find/find-role-by-id.query';
import { CreateRoleCommand } from '@app/iam/role/application/create/create-role.command';
import { IamRole, IamCreateRoleInput } from '@api/graphql';
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
        auditing?: AuditingMeta,
    ): Promise<IamRole | IamRoleDto>
    {
        await this.commandBus.dispatch(new CreateRoleCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id, {}, { timezone }));
    }
}