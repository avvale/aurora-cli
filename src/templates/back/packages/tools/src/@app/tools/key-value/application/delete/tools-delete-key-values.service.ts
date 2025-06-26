import { ToolsAddKeyValuesContextEvent, ToolsIKeyValueRepository } from '@app/tools/key-value';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsDeleteKeyValuesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIKeyValueRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const keyValues = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (keyValues.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddKeyValuesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const keyValuesRegistered = this.publisher.mergeObjectContext(
            new ToolsAddKeyValuesContextEvent(
                keyValues,
                cQMetadata,
            ),
        );

        keyValuesRegistered.deleted(); // apply event to model events
        keyValuesRegistered.commit(); // commit all events of model
    }
}
