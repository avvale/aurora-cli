import { CommonUpdateAttachmentByIdDto } from '../dto';
import { CommonCropAttachmentInput } from '@api/graphql';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonCropAttachmentHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: CommonCropAttachmentInput | CommonUpdateAttachmentByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean>
    {

        console.log(payload);
        // coding here
        /* await this.commandBus.dispatch(new YourCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));
        await this.queryBus.ask(new YourQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        )); */

        return true;
    }
}