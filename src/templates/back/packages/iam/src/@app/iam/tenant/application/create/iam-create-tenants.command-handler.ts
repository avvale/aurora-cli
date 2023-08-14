/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreateTenantsCommand } from './iam-create-tenants.command';
import { IamCreateTenantsService } from './iam-create-tenants.service';
import {
    IamTenantId,
    IamTenantName,
    IamTenantCode,
    IamTenantLogo,
    IamTenantIsActive,
    IamTenantMeta,
    IamTenantAccountIds,
    IamTenantCreatedAt,
    IamTenantUpdatedAt,
    IamTenantDeletedAt,
} from '../../domain/value-objects';

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
