/* eslint-disable key-spacing */
import { IamUpsertRoleAccountCommand } from '@app/iam/role-account';
import { IamUpsertRoleAccountService } from '@app/iam/role-account/application/upsert/iam-upsert-role-account.service';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpsertRoleAccountCommand)
export class IamUpsertRoleAccountCommandHandler implements ICommandHandler<IamUpsertRoleAccountCommand>
{
    constructor(
        private readonly upsertRoleAccountService: IamUpsertRoleAccountService,
    ) {}

    async execute(command: IamUpsertRoleAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertRoleAccountService.main(
            {
                roleId: new IamRoleAccountRoleId(command.payload.roleId),
                accountId: new IamRoleAccountAccountId(command.payload.accountId),
            },
            command.cQMetadata,
        );
    }
}
