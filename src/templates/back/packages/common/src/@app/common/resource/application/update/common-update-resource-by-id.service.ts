/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonIResourceRepository,
  CommonResource,
} from '@app/common/resource';
import {
  CommonResourceCode,
  CommonResourceHasAttachments,
  CommonResourceId,
  CommonResourceIsActive,
  CommonResourceName,
  CommonResourceUpdatedAt,
} from '@app/common/resource/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonUpdateResourceByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIResourceRepository,
  ) {}

  async main(
    payload: {
      id: CommonResourceId;
      code?: CommonResourceCode;
      name?: CommonResourceName;
      isActive?: CommonResourceIsActive;
      hasAttachments?: CommonResourceHasAttachments;
    },
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const resource = CommonResource.register(
      payload.id,
      undefined, // rowId
      payload.code,
      payload.name,
      payload.isActive,
      payload.hasAttachments,
      null, // createdAt
      new CommonResourceUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    // update by id
    await this.repository.updateById(resource, {
      constraint,
      cQMetadata,
      updateByIdOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const resourceRegister = this.publisher.mergeObjectContext(resource);

    resourceRegister.updated({
      payload: resource,
      cQMetadata,
    }); // apply event to model events
    resourceRegister.commit(); // commit all events of model
  }
}
