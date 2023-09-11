/* eslint-disable key-spacing */
import { IamUpdateRoleAccountByIdCommand } from '@app/iam/role-account';
import { IamUpdateRoleAccountByIdService } from '@app/iam/role-account/application/update/iam-update-role-account-by-id.service';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateRoleAccountByIdCommand)
export class IamUpdateRoleAccountByIdCommandHandler implements ICommandHandler<IamUpdateRoleAccountByIdCommand>
{
    constructor(
        private readonly updateRoleAccountByIdService: IamUpdateRoleAccountByIdService,
    ) {}

    async execute(command: IamUpdateRoleAccountByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRoleAccountByIdService.main(
            {
                roleId: new IamRoleAccountRoleId(command.payload.roleId),
                accountId: new IamRoleAccountAccountId(command.payload.accountId),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
