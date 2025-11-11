/* eslint-disable key-spacing */
import { IamUpdateTenantsCommand } from '@app/iam/tenant';
import { IamUpdateTenantsService } from '@app/iam/tenant/application/update/iam-update-tenants.service';
import {
    IamTenantAccountIds,
    IamTenantCode,
    IamTenantId,
    IamTenantIsActive,
    IamTenantLogo,
    IamTenantMeta,
    IamTenantName,
    IamTenantParentId,
} from '@app/iam/tenant/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateTenantsCommand)
export class IamUpdateTenantsCommandHandler
    implements ICommandHandler<IamUpdateTenantsCommand>
{
    constructor(
        private readonly updateTenantsService: IamUpdateTenantsService,
    ) {}

    async execute(command: IamUpdateTenantsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateTenantsService.main(
            {
                id: new IamTenantId(command.payload.id, { undefinable: true }),
                parentId: new IamTenantParentId(command.payload.parentId),
                name: new IamTenantName(command.payload.name, {
                    undefinable: true,
                }),
                code: new IamTenantCode(command.payload.code),
                logo: new IamTenantLogo(command.payload.logo),
                isActive: new IamTenantIsActive(command.payload.isActive, {
                    undefinable: true,
                }),
                meta: new IamTenantMeta(command.payload.meta),
                accountIds: new IamTenantAccountIds(command.payload.accountIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
