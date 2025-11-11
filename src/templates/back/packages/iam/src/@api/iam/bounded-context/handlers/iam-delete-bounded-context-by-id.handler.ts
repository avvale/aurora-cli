import { IamBoundedContext } from '@api/graphql';
import { IamBoundedContextDto } from '@api/iam/bounded-context';
import {
    IamDeleteBoundedContextByIdCommand,
    IamFindBoundedContextByIdQuery,
} from '@app/iam/bounded-context';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamDeleteBoundedContextByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamBoundedContext | IamBoundedContextDto> {
        const boundedContext = await this.queryBus.ask(
            new IamFindBoundedContextByIdQuery(id, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new IamDeleteBoundedContextByIdCommand(id, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return boundedContext;
    }
}
