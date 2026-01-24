import {
  CommonCreatedLangEvent,
  CommonCreatedLangsEvent,
  CommonDeletedLangEvent,
  CommonDeletedLangsEvent,
  CommonLang,
  CommonUpdatedLangEvent,
  CommonUpdatedLangsEvent,
} from '@app/common/lang';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAddLangsContextEvent extends AggregateRoot {
  constructor(public readonly aggregateRoots: CommonLang[] = []) {
    super();
  }

  *[Symbol.iterator]() {
    for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
  }

  created(): void {
    this.apply(
      new CommonCreatedLangsEvent(
        this.aggregateRoots.map(
          (lang) =>
            new CommonCreatedLangEvent(
              lang.id.value,
              lang.name.value,
              lang.image?.value,
              lang.iso6392.value,
              lang.iso6393.value,
              lang.ietf.value,
              lang.customCode?.value,
              lang.dir.value,
              lang.sort?.value,
              lang.isActive.value,
              lang.createdAt?.value,
              lang.updatedAt?.value,
              lang.deletedAt?.value,
            ),
        ),
      ),
    );
  }

  updated(): void {
    this.apply(
      new CommonUpdatedLangsEvent(
        this.aggregateRoots.map(
          (lang) =>
            new CommonUpdatedLangEvent(
              lang.id.value,
              lang.name.value,
              lang.image?.value,
              lang.iso6392.value,
              lang.iso6393.value,
              lang.ietf.value,
              lang.customCode?.value,
              lang.dir.value,
              lang.sort?.value,
              lang.isActive.value,
              lang.createdAt?.value,
              lang.updatedAt?.value,
              lang.deletedAt?.value,
            ),
        ),
      ),
    );
  }

  deleted(): void {
    this.apply(
      new CommonDeletedLangsEvent(
        this.aggregateRoots.map(
          (lang) =>
            new CommonDeletedLangEvent(
              lang.id.value,
              lang.name.value,
              lang.image?.value,
              lang.iso6392.value,
              lang.iso6393.value,
              lang.ietf.value,
              lang.customCode?.value,
              lang.dir.value,
              lang.sort?.value,
              lang.isActive.value,
              lang.createdAt?.value,
              lang.updatedAt?.value,
              lang.deletedAt?.value,
            ),
        ),
      ),
    );
  }
}
