import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';
import { IamRoleDto, IamUpdateRoleByIdDto } from '@api/iam/role';
import { IamFindRoleByIdQuery, IamUpdateRoleByIdCommand } from '@app/iam/role';
import {
    AuditingMeta,
    diff,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamUpdateRoleByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRoleByIdInput | IamUpdateRoleByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamRole | IamRoleDto> {
        const role = await this.queryBus.ask(
            new IamFindRoleByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );

        const dataToUpdate = diff(payload, role);

        await this.commandBus.dispatch(
            new IamUpdateRoleByIdCommand(
                {
                    ...dataToUpdate,
                    id: payload.id,
                },
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        return await this.queryBus.ask(
            new IamFindRoleByIdQuery(payload.id, constraint, {
                timezone,
            }),
        );
    }
}
