import {
  whatsappMockTimelineData,
  WhatsappTimeline,
} from '@app/whatsapp/timeline';
import {
  WhatsappTimelineAccounts,
  WhatsappTimelineCreatedAt,
  WhatsappTimelineDeletedAt,
  WhatsappTimelineId,
  WhatsappTimelineUpdatedAt,
  WhatsappTimelineWabaContactId,
  WhatsappTimelineWabaPhoneNumberId,
} from '@app/whatsapp/timeline/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class WhatsappMockTimelineSeeder extends MockSeeder<WhatsappTimeline> {
  public collectionSource: WhatsappTimeline[];

  constructor() {
    super();
    this._createMock();
  }

  private _createMock(): void {
    this.collectionSource = [];

    for (const timeline of _.orderBy(whatsappMockTimelineData, ['id'])) {
      this.collectionSource.push(
        WhatsappTimeline.register(
          new WhatsappTimelineId(timeline.id),
          new WhatsappTimelineAccounts(timeline.accounts),
          new WhatsappTimelineWabaPhoneNumberId(timeline.wabaPhoneNumberId),
          new WhatsappTimelineWabaContactId(timeline.wabaContactId),
          new WhatsappTimelineCreatedAt({ currentTimestamp: true }),
          new WhatsappTimelineUpdatedAt({ currentTimestamp: true }),
          new WhatsappTimelineDeletedAt(null),
        ),
      );
    }
  }
}
