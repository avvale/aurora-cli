import { ToolsIKeyValueRepository } from '@app/tools/key-value';
import { ToolsKeyValueId } from '@app/tools/key-value/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsDeleteKeyValueByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIKeyValueRepository,
    ) {}

    async main(
        id: ToolsKeyValueId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const keyValue = await this.repository
            .findById(
                id,
                {
                    constraint,
                    cQMetadata,
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                keyValue.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const keyValueRegister = this.publisher.mergeObjectContext(keyValue);

        keyValueRegister.deleted({
            payload: keyValue,
            cQMetadata,
        }); // apply event to model events
        keyValueRegister.commit(); // commit all events of model
    }
}
