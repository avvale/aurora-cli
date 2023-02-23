import { Injectable } from '@nestjs/common';
import { ICommandBus } from '@aurora-ts/core';

// auditing
import { AuditingMeta } from '@api/auditing/auditing.types';

// @app
import { CreateBoundedContextsCommand } from '@app/iam/bounded-context/application/create/create-bounded-contexts.command';
import { IamCreateBoundedContextInput } from '@api/graphql';
import { IamCreateBoundedContextDto } from '../dto';

@Injectable()
export class IamCreateBoundedContextsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: IamCreateBoundedContextInput[] | IamCreateBoundedContextDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateBoundedContextsCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));
        return true;
    }
}