import { IamCreateBoundedContextInput } from '@api/graphql';
import { IamCreateBoundedContextDto } from '@api/iam/bounded-context';
import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreateBoundedContextsHandler {
    constructor(private readonly commandBus: ICommandBus) {}

    async main(
        payload: IamCreateBoundedContextInput[] | IamCreateBoundedContextDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean> {
        await this.commandBus.dispatch(
            new IamCreateBoundedContextsCommand(payload, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return true;
    }
}
