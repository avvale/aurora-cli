/* eslint-disable key-spacing */
import { IamUpsertTenantAccountCommand } from '@app/iam/tenant-account';
import { IamUpsertTenantAccountService } from '@app/iam/tenant-account/application/upsert/iam-upsert-tenant-account.service';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpsertTenantAccountCommand)
export class IamUpsertTenantAccountCommandHandler implements ICommandHandler<IamUpsertTenantAccountCommand>
{
    constructor(
        private readonly upsertTenantAccountService: IamUpsertTenantAccountService,
    ) {}

    async execute(command: IamUpsertTenantAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertTenantAccountService.main(
            {
                tenantId: new IamTenantAccountTenantId(command.payload.tenantId),
                accountId: new IamTenantAccountAccountId(command.payload.accountId),
            },
            command.cQMetadata,
        );
    }
}
