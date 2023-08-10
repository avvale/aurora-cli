/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IamCreateTenantCommand } from './iam-create-tenant.command';
import { IamCreateTenantService } from './iam-create-tenant.service';
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

@CommandHandler(IamCreateTenantCommand)
export class IamCreateTenantCommandHandler implements ICommandHandler<IamCreateTenantCommand>
{
    constructor(
        private readonly createTenantService: IamCreateTenantService,
    ) {}

    async execute(command: IamCreateTenantCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTenantService.main(
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
