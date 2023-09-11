/* eslint-disable key-spacing */
import { IamCreateRoleAccountCommand } from '@app/iam/role-account';
import { IamCreateRoleAccountService } from '@app/iam/role-account/application/create/iam-create-role-account.service';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamCreateRoleAccountCommand)
export class IamCreateRoleAccountCommandHandler implements ICommandHandler<IamCreateRoleAccountCommand>
{
    constructor(
        private readonly createRoleAccountService: IamCreateRoleAccountService,
    ) {}

    async execute(command: IamCreateRoleAccountCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRoleAccountService.main(
            {
                roleId: new IamRoleAccountRoleId(command.payload.roleId),
                accountId: new IamRoleAccountAccountId(command.payload.accountId),
            },
            command.cQMetadata,
        );
    }
}
