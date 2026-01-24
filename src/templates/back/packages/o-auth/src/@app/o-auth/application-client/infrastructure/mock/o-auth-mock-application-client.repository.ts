import {
  OAuthApplicationClient,
  OAuthIApplicationClientRepository,
  oAuthMockApplicationClientData,
} from '@app/o-auth/application-client';
import {
  OAuthApplicationClientApplicationId,
  OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthMockApplicationClientRepository
  extends MockRepository<OAuthApplicationClient>
  implements OAuthIApplicationClientRepository
{
  public readonly repository: any;
  public readonly aggregateName: string = 'OAuthApplicationClient';
  public collectionSource: OAuthApplicationClient[];

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

    for (const itemCollection of <any[]>oAuthMockApplicationClientData) {
      itemCollection['createdAt'] = now;
      itemCollection['updatedAt'] = now;
      itemCollection['deletedAt'] = null;

      this.collectionSource.push(
        OAuthApplicationClient.register(
          new OAuthApplicationClientApplicationId(itemCollection.applicationId),
          new OAuthApplicationClientClientId(itemCollection.clientId),
        ),
      );
    }
  }
}
