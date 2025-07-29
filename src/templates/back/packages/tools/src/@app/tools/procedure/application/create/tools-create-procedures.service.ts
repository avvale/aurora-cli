import { ToolsAddProceduresContextEvent, ToolsIProcedureRepository, ToolsProcedure } from '@app/tools/procedure';
import {
    ToolsProcedureCheckedAt,
    ToolsProcedureCreatedAt,
    ToolsProcedureDeletedAt,
    ToolsProcedureDownScript,
    ToolsProcedureExecutedAt,
    ToolsProcedureHash,
    ToolsProcedureId,
    ToolsProcedureIsActive,
    ToolsProcedureIsExecuted,
    ToolsProcedureIsUpdated,
    ToolsProcedureName,
    ToolsProcedureSort,
    ToolsProcedureType,
    ToolsProcedureUpdatedAt,
    ToolsProcedureUpScript,
    ToolsProcedureVersion,
} from '@app/tools/procedure/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsCreateProceduresService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIProcedureRepository,
    ) {}

    async main(
        payload: {
            id: ToolsProcedureId;
            name: ToolsProcedureName;
            type: ToolsProcedureType;
            version: ToolsProcedureVersion;
            isActive: ToolsProcedureIsActive;
            isExecuted: ToolsProcedureIsExecuted;
            isUpdated: ToolsProcedureIsUpdated;
            upScript: ToolsProcedureUpScript;
            downScript: ToolsProcedureDownScript;
            sort: ToolsProcedureSort;
            hash: ToolsProcedureHash;
            executedAt: ToolsProcedureExecutedAt;
            checkedAt: ToolsProcedureCheckedAt;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const procedures = payload.map(procedure => ToolsProcedure.register(
            procedure.id,
            procedure.name,
            procedure.type,
            procedure.version,
            procedure.isActive,
            procedure.isExecuted,
            procedure.isUpdated,
            procedure.upScript,
            procedure.downScript,
            procedure.sort,
            procedure.hash,
            procedure.executedAt,
            procedure.checkedAt,
            new ToolsProcedureCreatedAt({ currentTimestamp: true }),
            new ToolsProcedureUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            procedures,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddProceduresContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const proceduresRegistered = this.publisher.mergeObjectContext(
            new ToolsAddProceduresContextEvent(
                procedures,
                cQMetadata,
            ),
        );

        proceduresRegistered.created(); // apply event to model events
        proceduresRegistered.commit(); // commit all events of model
    }
}
