/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import {
  IamBoundedContext,
  IamIBoundedContextRepository,
  iamMockBoundedContextData,
} from '@app/iam/bounded-context';
import {
  IamBoundedContextCreatedAt,
  IamBoundedContextDeletedAt,
  IamBoundedContextId,
  IamBoundedContextIsActive,
  IamBoundedContextName,
  IamBoundedContextRoot,
  IamBoundedContextRowId,
  IamBoundedContextSort,
  IamBoundedContextUpdatedAt,
} from '@app/iam/bounded-context/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMockBoundedContextRepository
  extends MockRepository<IamBoundedContext>
  implements IamIBoundedContextRepository
{
  public readonly repository: any;
  public readonly aggregateName: string = 'IamBoundedContext';
  public collectionSource: IamBoundedContext[];

  constructor() {
    super();
    this.createSourceMockData();
  }

  public reset(): void {
    this.createSourceMockData();
  }

  private createSourceMockData(): void {
    this.collectionSource = [];
    const now = Utils.nowTimestamp();

    for (const itemCollection of <any[]>iamMockBoundedContextData) {
      itemCollection['createdAt'] = now;
      itemCollection['updatedAt'] = now;
      itemCollection['deletedAt'] = null;

      this.collectionSource.push(
        IamBoundedContext.register(
          new IamBoundedContextId(itemCollection.id),
          new IamBoundedContextRowId(itemCollection.rowId),
          new IamBoundedContextName(itemCollection.name),
          new IamBoundedContextRoot(itemCollection.root),
          new IamBoundedContextSort(itemCollection.sort),
          new IamBoundedContextIsActive(itemCollection.isActive),
          new IamBoundedContextCreatedAt(itemCollection.createdAt),
          new IamBoundedContextUpdatedAt(itemCollection.updatedAt),
          new IamBoundedContextDeletedAt(itemCollection.deletedAt),
        ),
      );
    }
  }
}
