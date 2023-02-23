import { Injectable } from '@nestjs/common';
import { ICommandBus } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { CreatePermissionsCommand } from '@app/iam/permission/application/create/create-permissions.command';
import { IamCreatePermissionInput } from '@api/graphql';
import { IamCreatePermissionDto } from '../dto';

@Injectable()
export class IamCreatePermissionsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: IamCreatePermissionInput[] | IamCreatePermissionDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreatePermissionsCommand(
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