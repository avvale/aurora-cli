import { IamPermission } from '@api/graphql';
import { IamPermissionDto } from '@api/iam/permission';
import { IamDeletePermissionByIdCommand, IamFindPermissionByIdQuery } from '@app/iam/permission';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        auditing?: AuditingMeta,
    ): Promise<IamPermission | IamPermissionDto>
    {
        const permission = await this.queryBus.ask(new IamFindPermissionByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new IamDeletePermissionByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return permission;
    }
}
