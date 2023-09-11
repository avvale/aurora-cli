/* eslint-disable key-spacing */
import { IamCreateTenantCommand } from '@app/iam/tenant';
import { IamCreateTenantService } from '@app/iam/tenant/application/create/iam-create-tenant.service';
import {
    IamTenantAccountIds,
    IamTenantCode,
    IamTenantId,
    IamTenantIsActive,
    IamTenantLogo,
    IamTenantMeta,
    IamTenantName,
} from '@app/iam/tenant/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

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
