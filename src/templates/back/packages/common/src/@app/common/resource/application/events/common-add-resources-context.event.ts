/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import {
  CommonCreatedResourceEvent,
  CommonCreatedResourcesEvent,
  CommonResource,
} from '@app/common/resource';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddResourcesContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: CommonResource[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new CommonCreatedResourcesEvent({
        payload: this.aggregateRoots.map(
          (resource) =>
            new CommonCreatedResourceEvent({
              payload: {
                id: resource.id.value,
                code: resource.code.value,
                name: resource.name.value,
                isActive: resource.isActive.value,
                hasAttachments: resource.hasAttachments.value,
                createdAt: resource.createdAt?.value,
                updatedAt: resource.updatedAt?.value,
                deletedAt: resource.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
