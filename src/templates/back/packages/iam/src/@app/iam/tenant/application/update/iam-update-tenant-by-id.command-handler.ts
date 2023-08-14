/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpdateTenantByIdCommand } from './iam-update-tenant-by-id.command';
import { IamUpdateTenantByIdService } from './iam-update-tenant-by-id.service';
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

@CommandHandler(IamUpdateTenantByIdCommand)
export class IamUpdateTenantByIdCommandHandler implements ICommandHandler<IamUpdateTenantByIdCommand>
{
    constructor(
        private readonly updateTenantByIdService: IamUpdateTenantByIdService,
    ) {}

    async execute(command: IamUpdateTenantByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTenantByIdService.main(
            {
                id: new IamTenantId(command.payload.id),
                name: new IamTenantName(command.payload.name, { undefinable: true }),
                code: new IamTenantCode(command.payload.code),
                logo: new IamTenantLogo(command.payload.logo),
                isActive: new IamTenantIsActive(command.payload.isActive, { undefinable: true }),
                meta: new IamTenantMeta(command.payload.meta),
                accountIds: new IamTenantAccountIds(command.payload.accountIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
