import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus } from '@aurora-ts/core';

// @app
import { CreateRolesCommand } from '@app/iam/role/application/create/create-roles.command';
import { IamCreateRoleInput } from '@api/graphql';
import { IamCreateRoleDto } from '../dto';

@Injectable()
export class IamCreateRolesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: IamCreateRoleInput[] | IamCreateRoleDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateRolesCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));
        return true;
    }
}