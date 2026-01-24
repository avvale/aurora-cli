import { CommonILangRepository, CommonLang } from '@app/common/lang';
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
export class CommonUpsertLangService {
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
    },
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // upsert aggregate with factory pattern
    const lang = CommonLang.register(
      payload.id,
      payload.name,
      payload.image,
      payload.iso6392,
      payload.iso6393,
      payload.ietf,
      payload.customCode,
      payload.dir,
      payload.sort,
      payload.isActive,
      new CommonLangCreatedAt({ currentTimestamp: true }),
      new CommonLangUpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    await this.repository.upsert(lang, {
      upsertOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const langRegister = this.publisher.mergeObjectContext(lang);

    langRegister.created(lang); // apply event to model events
    langRegister.commit(); // commit all events of model
  }
}
