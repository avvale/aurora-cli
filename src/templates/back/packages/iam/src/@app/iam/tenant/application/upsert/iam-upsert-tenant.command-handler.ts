/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamUpsertTenantCommand } from './iam-upsert-tenant.command';
import { IamUpsertTenantService } from './iam-upsert-tenant.service';
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

@CommandHandler(IamUpsertTenantCommand)
export class IamUpsertTenantCommandHandler implements ICommandHandler<IamUpsertTenantCommand>
{
    constructor(
        private readonly upsertTenantService: IamUpsertTenantService,
    ) {}

    async execute(command: IamUpsertTenantCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertTenantService.main(
            {
                id: new IamTenantId(command.payload.id),
                name: new IamTenantName(command.payload.name),
                code: new IamTenantCode(command.payload.code),
                logo: new IamTenantLogo(command.payload.logo),
                isActive: new IamTenantIsActive(command.payload.isActive),
                meta: new IamTenantMeta(command.payload.meta),
                accountIds: new IamTenantAccountIds(command.payload.accountIds),
            },
            command.cQMetadata,
        );
    }
}
