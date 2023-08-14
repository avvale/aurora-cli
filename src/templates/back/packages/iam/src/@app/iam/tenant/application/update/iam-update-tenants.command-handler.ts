/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpdateTenantsCommand } from './iam-update-tenants.command';
import { IamUpdateTenantsService } from './iam-update-tenants.service';
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

@CommandHandler(IamUpdateTenantsCommand)
export class IamUpdateTenantsCommandHandler implements ICommandHandler<IamUpdateTenantsCommand>
{
    constructor(
        private readonly updateTenantsService: IamUpdateTenantsService,
    ) {}

    async execute(command: IamUpdateTenantsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTenantsService.main(
            {
                id: new IamTenantId(command.payload.id, { undefinable: true }),
                name: new IamTenantName(command.payload.name, { undefinable: true }),
                code: new IamTenantCode(command.payload.code),
                logo: new IamTenantLogo(command.payload.logo),
                isActive: new IamTenantIsActive(command.payload.isActive, { undefinable: true }),
                meta: new IamTenantMeta(command.payload.meta),
                accountIds: new IamTenantAccountIds(command.payload.accountIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
