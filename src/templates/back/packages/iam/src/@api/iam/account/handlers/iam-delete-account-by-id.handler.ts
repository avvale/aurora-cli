import { IamAccount } from '@api/graphql';
import {
    IamDeleteAccountByIdCommand,
    IamFindAccountByIdQuery,
} from '@app/iam/account';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamDeleteAccountByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamAccount> {
        const account = await this.queryBus.ask(
            new IamFindAccountByIdQuery(id, constraint, {
                timezone,
            }),
        );

        if (!account) {
            throw new NotFoundException(`IamAccount with id: ${id}, not found`);
        }

        await this.commandBus.dispatch(
            new IamDeleteAccountByIdCommand(id, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return account;
    }
}
