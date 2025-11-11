import { IamFindAccountQuery } from '@app/iam/account';
import { IQueryBus, Operator } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCheckUniqueUsernameAccountHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(username: string, avoidUsernames?: string[]): Promise<boolean> {
        try {
            const account = await this.queryBus.ask(
                new IamFindAccountQuery({
                    where: {
                        [Operator.and]: [
                            { username },
                            {
                                username: {
                                    [Operator.notIn]: avoidUsernames,
                                },
                            },
                        ],
                    },
                }),
            );

            return !account;
        } catch (error) {
            if (error.status === 404) return true;
        }
    }
}
