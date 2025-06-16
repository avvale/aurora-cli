import { IamCreateRoleInput, IamRole } from '@api/graphql';
import { IamCreateRoleDto, IamRoleDto } from '@api/iam/role';
import { IamCreateRoleCommand, IamFindRoleByIdQuery } from '@app/iam/role';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreateRoleHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) { }

    async main(
        payload: IamCreateRoleInput | IamCreateRoleDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRole | IamRoleDto>
    {
        await this.commandBus.dispatch(new IamCreateRoleCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new IamFindRoleByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
