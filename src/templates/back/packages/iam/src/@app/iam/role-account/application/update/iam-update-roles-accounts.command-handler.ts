/* eslint-disable key-spacing */
import { IamUpdateRolesAccountsCommand } from '@app/iam/role-account';
import { IamUpdateRolesAccountsService } from '@app/iam/role-account/application/update/iam-update-roles-accounts.service';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateRolesAccountsCommand)
export class IamUpdateRolesAccountsCommandHandler
    implements ICommandHandler<IamUpdateRolesAccountsCommand>
{
    constructor(
        private readonly updateRolesAccountsService: IamUpdateRolesAccountsService,
    ) {}

    async execute(command: IamUpdateRolesAccountsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateRolesAccountsService.main(
            {
                roleId: new IamRoleAccountRoleId(command.payload.roleId, {
                    undefinable: true,
                }),
                accountId: new IamRoleAccountAccountId(
                    command.payload.accountId,
                    { undefinable: true },
                ),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
