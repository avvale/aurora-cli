/* eslint-disable key-spacing */
import { IamCreateTenantAccountCommand } from '@app/iam/tenant-account';
import { IamCreateTenantAccountService } from '@app/iam/tenant-account/application/create/iam-create-tenant-account.service';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateTenantAccountCommand)
export class IamCreateTenantAccountCommandHandler implements ICommandHandler<IamCreateTenantAccountCommand>
{
    constructor(
        private readonly createTenantAccountService: IamCreateTenantAccountService,
    ) {}

    async execute(command: IamCreateTenantAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createTenantAccountService.main(
            {
                tenantId: new IamTenantAccountTenantId(command.payload.tenantId),
                accountId: new IamTenantAccountAccountId(command.payload.accountId),
            },
            command.cQMetadata,
        );
    }
}
