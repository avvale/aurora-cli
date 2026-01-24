/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamAddBoundedContextsContextEvent,
  IamBoundedContext,
  IamIBoundedContextRepository,
} from '@app/iam/bounded-context';
import {
  IamBoundedContextCreatedAt,
  IamBoundedContextId,
  IamBoundedContextIsActive,
  IamBoundedContextName,
  IamBoundedContextRoot,
  IamBoundedContextSort,
  IamBoundedContextUpdatedAt,
} from '@app/iam/bounded-context/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamCreateBoundedContextsService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: IamIBoundedContextRepository,
  ) {}

  async main(
    payload: {
      id: IamBoundedContextId;
      name: IamBoundedContextName;
      root: IamBoundedContextRoot;
      sort: IamBoundedContextSort;
      isActive: IamBoundedContextIsActive;
    }[],
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const boundedContexts = payload.map((boundedContext) =>
      IamBoundedContext.register(
        boundedContext.id,
        undefined, // rowId
        boundedContext.name,
        boundedContext.root,
        boundedContext.sort,
        boundedContext.isActive,
        new IamBoundedContextCreatedAt({ currentTimestamp: true }),
        new IamBoundedContextUpdatedAt({ currentTimestamp: true }),
        null, // deleteAt
      ),
    );

    // insert
    await this.repository.insert(boundedContexts, {
      insertOptions: cQMetadata?.repositoryOptions,
    });

    // create AddBoundedContextsContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const boundedContextsRegistered = this.publisher.mergeObjectContext(
      new IamAddBoundedContextsContextEvent(boundedContexts, cQMetadata),
    );

    boundedContextsRegistered.created(); // apply event to model events
    boundedContextsRegistered.commit(); // commit all events of model
  }
}
