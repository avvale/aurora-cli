import { ToolsIMigrationRepository } from '@app/tools/migration';
import { ToolsMigrationId } from '@app/tools/migration/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsDeleteMigrationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIMigrationRepository,
    ) {}

    async main(
        id: ToolsMigrationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const migration = await this.repository
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
                migration.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const migrationRegister = this.publisher.mergeObjectContext(migration);

        migrationRegister.deleted({
            payload: migration,
            cQMetadata,
        }); // apply event to model events
        migrationRegister.commit(); // commit all events of model
    }
}
