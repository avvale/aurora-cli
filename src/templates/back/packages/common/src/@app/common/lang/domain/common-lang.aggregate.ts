/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import {
  CommonCreatedLangEvent,
  CommonDeletedLangEvent,
  CommonUpdatedLangEvent,
} from '@app/common/lang';
import {
  CommonLangCreatedAt,
  CommonLangCustomCode,
  CommonLangDeletedAt,
  CommonLangDir,
  CommonLangId,
  CommonLangIetf,
  CommonLangImage,
  CommonLangIsActive,
  CommonLangIso6392,
  CommonLangIso6393,
  CommonLangName,
  CommonLangRowId,
  CommonLangSort,
  CommonLangUpdatedAt,
} from '@app/common/lang/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonLang extends AggregateRoot {
  id: CommonLangId;
  rowId: CommonLangRowId;
  name: CommonLangName;
  image: CommonLangImage;
  iso6392: CommonLangIso6392;
  iso6393: CommonLangIso6393;
  ietf: CommonLangIetf;
  customCode: CommonLangCustomCode;
  dir: CommonLangDir;
  sort: CommonLangSort;
  isActive: CommonLangIsActive;
  createdAt: CommonLangCreatedAt;
  updatedAt: CommonLangUpdatedAt;
  deletedAt: CommonLangDeletedAt;

  constructor(
    id: CommonLangId,
    rowId: CommonLangRowId,
    name: CommonLangName,
    image: CommonLangImage,
    iso6392: CommonLangIso6392,
    iso6393: CommonLangIso6393,
    ietf: CommonLangIetf,
    customCode: CommonLangCustomCode,
    dir: CommonLangDir,
    sort: CommonLangSort,
    isActive: CommonLangIsActive,
    createdAt: CommonLangCreatedAt,
    updatedAt: CommonLangUpdatedAt,
    deletedAt: CommonLangDeletedAt,
  ) {
    super();
    this.id = id;
    this.rowId = rowId;
    this.name = name;
    this.image = image;
    this.iso6392 = iso6392;
    this.iso6393 = iso6393;
    this.ietf = ietf;
    this.customCode = customCode;
    this.dir = dir;
    this.sort = sort;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static register(
    id: CommonLangId,
    rowId: CommonLangRowId,
    name: CommonLangName,
    image: CommonLangImage,
    iso6392: CommonLangIso6392,
    iso6393: CommonLangIso6393,
    ietf: CommonLangIetf,
    customCode: CommonLangCustomCode,
    dir: CommonLangDir,
    sort: CommonLangSort,
    isActive: CommonLangIsActive,
    createdAt: CommonLangCreatedAt,
    updatedAt: CommonLangUpdatedAt,
    deletedAt: CommonLangDeletedAt,
  ): CommonLang {
    return new CommonLang(
      id,
      rowId,
      name,
      image,
      iso6392,
      iso6393,
      ietf,
      customCode,
      dir,
      sort,
      isActive,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }

  created(event: { payload: CommonLang; cQMetadata?: CQMetadata }): void {
    this.apply(
      new CommonCreatedLangEvent({
        payload: {
          id: event.payload.id.value,
          name: event.payload.name.value,
          image: event.payload.image?.value,
          iso6392: event.payload.iso6392.value,
          iso6393: event.payload.iso6393.value,
          ietf: event.payload.ietf.value,
          customCode: event.payload.customCode?.value,
          dir: event.payload.dir.value,
          sort: event.payload.sort?.value,
          isActive: event.payload.isActive.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  updated(event: { payload: CommonLang; cQMetadata?: CQMetadata }): void {
    this.apply(
      new CommonUpdatedLangEvent({
        payload: {
          id: event.payload.id?.value,
          name: event.payload.name?.value,
          image: event.payload.image?.value,
          iso6392: event.payload.iso6392?.value,
          iso6393: event.payload.iso6393?.value,
          ietf: event.payload.ietf?.value,
          customCode: event.payload.customCode?.value,
          dir: event.payload.dir?.value,
          sort: event.payload.sort?.value,
          isActive: event.payload.isActive?.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  deleted(event: { payload: CommonLang; cQMetadata?: CQMetadata }): void {
    this.apply(
      new CommonDeletedLangEvent({
        payload: {
          id: event.payload.id.value,
          rowId: event.payload.rowId.value,
          name: event.payload.name.value,
          image: event.payload.image?.value,
          iso6392: event.payload.iso6392.value,
          iso6393: event.payload.iso6393.value,
          ietf: event.payload.ietf.value,
          customCode: event.payload.customCode?.value,
          dir: event.payload.dir.value,
          sort: event.payload.sort?.value,
          isActive: event.payload.isActive.value,
          createdAt: event.payload.createdAt?.value,
          updatedAt: event.payload.updatedAt?.value,
          deletedAt: event.payload.deletedAt?.value,
        },
        cQMetadata: event.cQMetadata,
      }),
    );
  }

  toDTO(): LiteralObject {
    return {
      id: this.id.value,
      rowId: this.rowId.value,
      name: this.name.value,
      image: this.image?.value,
      iso6392: this.iso6392.value,
      iso6393: this.iso6393.value,
      ietf: this.ietf.value,
      customCode: this.customCode?.value,
      dir: this.dir.value,
      sort: this.sort?.value,
      isActive: this.isActive.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      name: this.name.value,
      image: this.image?.value,
      iso6392: this.iso6392.value,
      iso6393: this.iso6393.value,
      ietf: this.ietf.value,
      customCode: this.customCode?.value,
      dir: this.dir.value,
      sort: this.sort?.value,
      isActive: this.isActive.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
    };
  }
}
