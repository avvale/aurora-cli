import { IamFindAccountQuery } from '@app/iam/account';
import { ICommandBus, IQueryBus, Operator } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCheckUniqueEmailAccountHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(email: string, avoidEmails?: string[]): Promise<boolean> {
        try {
            const account = await this.queryBus.ask(
                new IamFindAccountQuery({
                    where: {
                        [Operator.and]: [
                            { email },
                            {
                                email: {
                                    [Operator.notIn]: avoidEmails.filter(
                                        (email) => email !== null,
                                    ),
                                },
                            },
                            {
                                email: {
                                    [Operator.ne]: null,
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
