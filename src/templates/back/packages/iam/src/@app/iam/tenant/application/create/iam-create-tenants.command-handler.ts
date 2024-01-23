/* eslint-disable key-spacing */
import { IamCreateTenantsCommand } from '@app/iam/tenant';
import { IamCreateTenantsService } from '@app/iam/tenant/application/create/iam-create-tenants.service';
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

@CommandHandler(IamCreateTenantsCommand)
export class IamCreateTenantsCommandHandler implements ICommandHandler<IamCreateTenantsCommand>
{
    constructor(
        private readonly createTenantsService: IamCreateTenantsService,
    ) {}

    async execute(command: IamCreateTenantsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTenantsService.main(
            command.payload
                .map(tenant =>
                {
                    return {
                        id: new IamTenantId(tenant.id),
                        parentId: new IamTenantParentId(tenant.parentId),
                        name: new IamTenantName(tenant.name),
                        code: new IamTenantCode(tenant.code),
                        logo: new IamTenantLogo(tenant.logo),
                        isActive: new IamTenantIsActive(tenant.isActive),
                        meta: new IamTenantMeta(tenant.meta),
                        accountIds: new IamTenantAccountIds(tenant.accountIds),
                    };
                }),
            command.cQMetadata,
        );
    }
}
