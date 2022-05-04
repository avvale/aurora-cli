/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTenantCommand } from './update-tenant.command';
import { UpdateTenantService } from './update-tenant.service';
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

@CommandHandler(UpdateTenantCommand)
export class UpdateTenantCommandHandler implements ICommandHandler<UpdateTenantCommand>
{
    constructor(
        private readonly updateTenantService: UpdateTenantService,
    ) {}

    async execute(command: UpdateTenantCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateTenantService.main(
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