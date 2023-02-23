import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { FindTenantByIdQuery } from '@app/iam/tenant/application/find/find-tenant-by-id.query';
import { UpdateTenantByIdCommand } from '@app/iam/tenant/application/update/update-tenant-by-id.command';
import { IamTenant, IamUpdateTenantByIdInput } from '@api/graphql';
import { IamTenantDto, IamUpdateTenantByIdDto } from '../dto';

@Injectable()
export class IamUpdateTenantByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTenantByIdInput | IamUpdateTenantByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTenant | IamTenantDto>
    {
        const tenant = await this.queryBus.ask(new FindTenantByIdQuery(payload.id, constraint, { timezone }));

        const dataToUpdate = Utils.diff(payload, tenant);

        await this.commandBus.dispatch(new UpdateTenantByIdCommand(
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
        ));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, constraint, { timezone }));
    }
}