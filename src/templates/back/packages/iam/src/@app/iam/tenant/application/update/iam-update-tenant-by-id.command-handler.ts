/* eslint-disable key-spacing */
import { IamUpdateTenantByIdCommand } from '@app/iam/tenant';
import { IamUpdateTenantByIdService } from '@app/iam/tenant/application/update/iam-update-tenant-by-id.service';
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
                parentId: new IamTenantParentId(command.payload.parentId),
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
