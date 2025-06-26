import { ToolsAddProceduresContextEvent, ToolsIProcedureRepository } from '@app/tools/procedure';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsDeleteProceduresService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIProcedureRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const procedures = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (procedures.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddProceduresContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const proceduresRegistered = this.publisher.mergeObjectContext(
            new ToolsAddProceduresContextEvent(
                procedures,
                cQMetadata,
            ),
        );

        proceduresRegistered.deleted(); // apply event to model events
        proceduresRegistered.commit(); // commit all events of model
    }
}
