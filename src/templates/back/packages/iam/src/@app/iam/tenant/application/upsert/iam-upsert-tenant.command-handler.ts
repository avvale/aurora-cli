/* eslint-disable key-spacing */
import { IamUpsertTenantCommand } from '@app/iam/tenant';
import { IamUpsertTenantService } from '@app/iam/tenant/application/upsert/iam-upsert-tenant.service';
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
                parentId: new IamTenantParentId(command.payload.parentId),
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
