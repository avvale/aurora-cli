/* eslint-disable key-spacing */
import { IamUpdateAndIncrementRolesAccountsCommand } from '@app/iam/role-account';
import { IamUpdateAndIncrementRolesAccountsService } from '@app/iam/role-account/application/update/iam-update-and-increment-roles-accounts.service';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateAndIncrementRolesAccountsCommand)
export class IamUpdateAndIncrementRolesAccountsCommandHandler implements ICommandHandler<IamUpdateAndIncrementRolesAccountsCommand>
{
    constructor(
        private readonly updateRolesAccountsService: IamUpdateAndIncrementRolesAccountsService,
    ) {}

    async execute(command: IamUpdateAndIncrementRolesAccountsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRolesAccountsService.main(
            {
                roleId: new IamRoleAccountRoleId(command.payload.roleId, { undefinable: true }),
                accountId: new IamRoleAccountAccountId(command.payload.accountId, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
