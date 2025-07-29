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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ToolsUpdateProceduresService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ToolsIProcedureRepository,
    ) {}

    async main(
        payload: {
            id?: ToolsProcedureId;
            name?: ToolsProcedureName;
            type?: ToolsProcedureType;
            version?: ToolsProcedureVersion;
            isActive?: ToolsProcedureIsActive;
            isExecuted?: ToolsProcedureIsExecuted;
            isUpdated?: ToolsProcedureIsUpdated;
            upScript?: ToolsProcedureUpScript;
            downScript?: ToolsProcedureDownScript;
            sort?: ToolsProcedureSort;
            hash?: ToolsProcedureHash;
            executedAt?: ToolsProcedureExecutedAt;
            checkedAt?: ToolsProcedureCheckedAt;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const procedure = ToolsProcedure.register(
            payload.id,
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
            null, // createdAt
            new ToolsProcedureUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(
            procedure,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const procedures = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const proceduresRegister = this.publisher.mergeObjectContext(
            new ToolsAddProceduresContextEvent(
                procedures,
                cQMetadata,
            ),
        );

        proceduresRegister.updated(); // apply event to model events
        proceduresRegister.commit(); // commit all events of model
    }
}
