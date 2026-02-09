/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonAddLangsContextEvent,
  CommonILangRepository,
  CommonLang,
} from '@app/common/lang';
import {
  CommonLangCreatedAt,
  CommonLangCustomCode,
  CommonLangDir,
  CommonLangId,
  CommonLangIetf,
  CommonLangImage,
  CommonLangIsActive,
  CommonLangIso6392,
  CommonLangIso6393,
  CommonLangName,
  CommonLangSort,
  CommonLangUpdatedAt,
} from '@app/common/lang/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonCreateLangsService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonILangRepository,
  ) {}

  async main(
    payload: {
      id: CommonLangId;
      name: CommonLangName;
      image: CommonLangImage;
      iso6392: CommonLangIso6392;
      iso6393: CommonLangIso6393;
      ietf: CommonLangIetf;
      customCode: CommonLangCustomCode;
      dir: CommonLangDir;
      sort: CommonLangSort;
      isActive: CommonLangIsActive;
    }[],
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const langs = payload.map((lang) =>
      CommonLang.register(
        lang.id,
        undefined, // rowId
        lang.name,
        lang.image,
        lang.iso6392,
        lang.iso6393,
        lang.ietf,
        lang.customCode,
        lang.dir,
        lang.sort,
        lang.isActive,
        new CommonLangCreatedAt({ currentTimestamp: true }),
        new CommonLangUpdatedAt({ currentTimestamp: true }),
        null, // deleteAt
      ),
    );

    // insert
    await this.repository.insert(langs, {
      insertOptions: cQMetadata?.repositoryOptions,
    });

    // create AddLangsContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const langsRegistered = this.publisher.mergeObjectContext(
      new CommonAddLangsContextEvent(langs, cQMetadata),
    );

    langsRegistered.created(); // apply event to model events
    langsRegistered.commit(); // commit all events of model
  }
}
