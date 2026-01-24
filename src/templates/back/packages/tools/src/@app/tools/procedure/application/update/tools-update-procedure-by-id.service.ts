import {
  ToolsIProcedureRepository,
  ToolsProcedure,
} from '@app/tools/procedure';
import {
  ToolsProcedureCheckedAt,
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
export class ToolsUpdateProcedureByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ToolsIProcedureRepository,
  ) {}

  async main(
    payload: {
      id: ToolsProcedureId;
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
    constraint?: QueryStatement,
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
      null, // createdAt
      new ToolsProcedureUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    // update by id
    await this.repository.updateById(procedure, {
      constraint,
      cQMetadata,
      updateByIdOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const procedureRegister = this.publisher.mergeObjectContext(procedure);

    procedureRegister.updated({
      payload: procedure,
      cQMetadata,
    }); // apply event to model events
    procedureRegister.commit(); // commit all events of model
  }
}
