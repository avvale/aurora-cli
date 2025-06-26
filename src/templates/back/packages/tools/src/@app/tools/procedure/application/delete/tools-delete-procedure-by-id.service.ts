import { ToolsIProcedureRepository } from '@app/tools/procedure';
import { ToolsProcedureId } from '@app/tools/procedure/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsDeleteProcedureByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIProcedureRepository,
    ) {}

    async main(
        id: ToolsProcedureId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const procedure = await this.repository
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
                procedure.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const procedureRegister = this.publisher.mergeObjectContext(procedure);

        procedureRegister.deleted({
            payload: procedure,
            cQMetadata,
        }); // apply event to model events
        procedureRegister.commit(); // commit all events of model
    }
}
