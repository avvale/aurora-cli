import { IamCreatePermissionInput, IamPermission } from '@api/graphql';
import { IamCreatePermissionDto, IamPermissionDto } from '@api/iam/permission';
import {
    IamCreatePermissionCommand,
    IamFindPermissionByIdQuery,
} from '@app/iam/permission';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreatePermissionHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreatePermissionInput | IamCreatePermissionDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamPermission | IamPermissionDto> {
        await this.commandBus.dispatch(
            new IamCreatePermissionCommand(payload, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return await this.queryBus.ask(
            new IamFindPermissionByIdQuery(
                payload.id,
                {},
                {
                    timezone,
                },
            ),
        );
    }
}
