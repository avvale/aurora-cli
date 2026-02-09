/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonCreatedLangEvent,
  CommonCreatedLangsEvent,
  CommonLang,
} from '@app/common/lang';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddLangsContextEvent extends AggregateRoot {
  constructor(
    public readonly aggregateRoots: CommonLang[] = [],
    public readonly cQMetadata?: CQMetadata,
  ) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new CommonCreatedLangsEvent({
        payload: this.aggregateRoots.map(
          (lang) =>
            new CommonCreatedLangEvent({
              payload: {
                id: lang.id.value,
                name: lang.name.value,
                image: lang.image?.value,
                iso6392: lang.iso6392.value,
                iso6393: lang.iso6393.value,
                ietf: lang.ietf.value,
                customCode: lang.customCode?.value,
                dir: lang.dir.value,
                sort: lang.sort?.value,
                isActive: lang.isActive.value,
                createdAt: lang.createdAt?.value,
                updatedAt: lang.updatedAt?.value,
                deletedAt: lang.deletedAt?.value,
              },
            }),
        ),
        cQMetadata: this.cQMetadata,
      }),
    );
  }
}
