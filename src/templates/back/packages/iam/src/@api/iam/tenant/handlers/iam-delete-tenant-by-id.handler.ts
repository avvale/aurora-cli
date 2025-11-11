import { IamTenant } from '@api/graphql';
import { IamTenantDto } from '@api/iam/tenant';
import {
    IamDeleteTenantByIdCommand,
    IamFindTenantByIdQuery,
} from '@app/iam/tenant';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteTenantByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenant | IamTenantDto> {
        const tenant = await this.queryBus.ask(
            new IamFindTenantByIdQuery(id, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new IamDeleteTenantByIdCommand(id, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return tenant;
    }
}
