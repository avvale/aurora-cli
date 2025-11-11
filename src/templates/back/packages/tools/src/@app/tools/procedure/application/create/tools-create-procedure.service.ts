import {
    ToolsIProcedureRepository,
    ToolsProcedure,
} from '@app/tools/procedure';
import {
    ToolsProcedureCheckedAt,
    ToolsProcedureCreatedAt,
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
export class ToolsCreateProcedureService {
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
        },
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const procedure = ToolsProcedure.register(
            payload.id,
            undefined, // rowId
            payload.name,
            payload.type,
            payload.version,
            payload.isActive,
            payload.isExecuted,
            payload.isUpdated,
            payload.upScript,
            payload.downScript,
            payload.sort,
            payload.hash,
            payload.executedAt,
            payload.checkedAt,
            new ToolsProcedureCreatedAt({ currentTimestamp: true }),
            new ToolsProcedureUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(procedure, {
            createOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const procedureRegister = this.publisher.mergeObjectContext(procedure);

        procedureRegister.created({
            payload: procedure,
            cQMetadata,
        }); // apply event to model events
        procedureRegister.commit(); // commit all events of model
    }
}
