/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTenantByIdCommand } from './update-tenant-by-id.command';
import { UpdateTenantByIdService } from './update-tenant-by-id.service';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantData,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateTenantByIdCommand)
export class UpdateTenantByIdCommandHandler implements ICommandHandler<UpdateTenantByIdCommand>
{
    constructor(
        private readonly updateTenantByIdService: UpdateTenantByIdService,
    ) {}

    async execute(command: UpdateTenantByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTenantByIdService.main(
            {
                id: new TenantId(command.payload.id),
                name: new TenantName(command.payload.name, { undefinable: true }),
                code: new TenantCode(command.payload.code),
                logo: new TenantLogo(command.payload.logo),
                isActive: new TenantIsActive(command.payload.isActive, { undefinable: true }),
                data: new TenantData(command.payload.data),
                accountIds: new TenantAccountIds(command.payload.accountIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}