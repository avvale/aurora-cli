import { IamAccount } from '@api/graphql';
import { IamFindAccountByIdQuery } from '@app/iam/account';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class IamFindAccountByIdHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamAccount> {
        const account = await this.queryBus.ask(
            new IamFindAccountByIdQuery(id, constraint, {
                timezone,
            }),
        );

        if (!account) {
            throw new NotFoundException(`IamAccount with id: ${id}, not found`);
        }

        return account;
    }
}
