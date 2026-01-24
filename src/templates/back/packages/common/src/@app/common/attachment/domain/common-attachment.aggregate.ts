/* eslint-disable key-spacing */
import {
  CommonCreatedAttachmentEvent,
  CommonDeletedAttachmentEvent,
  CommonUpdatedAttachmentEvent,
} from '@app/common/attachment';
import { CommonAttachmentFamily } from '@app/common/attachment-family';
import { CommonAttachmentLibrary } from '@app/common/attachment-library';
import {
  CommonAttachmentAlt,
  CommonAttachmentAttachableId,
  CommonAttachmentCreatedAt,
  CommonAttachmentDeletedAt,
  CommonAttachmentExtension,
  CommonAttachmentFamilyId,
  CommonAttachmentFilename,
  CommonAttachmentHeight,
  CommonAttachmentId,
  CommonAttachmentIsCropable,
  CommonAttachmentLangId,
  CommonAttachmentLibraryFilename,
  CommonAttachmentLibraryId,
  CommonAttachmentMeta,
  CommonAttachmentMimetype,
  CommonAttachmentOriginFilename,
  CommonAttachmentRelativePathSegments,
  CommonAttachmentSize,
  CommonAttachmentSizes,
  CommonAttachmentSort,
  CommonAttachmentTitle,
  CommonAttachmentUpdatedAt,
  CommonAttachmentUrl,
  CommonAttachmentWidth,
} from '@app/common/attachment/domain/value-objects';
import { CommonLang } from '@app/common/lang';
import { LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAttachment extends AggregateRoot {
  id: CommonAttachmentId;
  familyId: CommonAttachmentFamilyId;
  attachableId: CommonAttachmentAttachableId;
  langId: CommonAttachmentLangId;
  sort: CommonAttachmentSort;
  alt: CommonAttachmentAlt;
  title: CommonAttachmentTitle;
  originFilename: CommonAttachmentOriginFilename;
  filename: CommonAttachmentFilename;
  mimetype: CommonAttachmentMimetype;
  extension: CommonAttachmentExtension;
  relativePathSegments: CommonAttachmentRelativePathSegments;
  width: CommonAttachmentWidth;
  height: CommonAttachmentHeight;
  size: CommonAttachmentSize;
  url: CommonAttachmentUrl;
  isCropable: CommonAttachmentIsCropable;
  libraryId: CommonAttachmentLibraryId;
  libraryFilename: CommonAttachmentLibraryFilename;
  sizes: CommonAttachmentSizes;
  meta: CommonAttachmentMeta;
  createdAt: CommonAttachmentCreatedAt;
  updatedAt: CommonAttachmentUpdatedAt;
  deletedAt: CommonAttachmentDeletedAt;
  family: CommonAttachmentFamily;
  lang: CommonLang;
  library: CommonAttachmentLibrary;

  constructor(
    id: CommonAttachmentId,
    familyId: CommonAttachmentFamilyId,
    attachableId: CommonAttachmentAttachableId,
    langId: CommonAttachmentLangId,
    sort: CommonAttachmentSort,
    alt: CommonAttachmentAlt,
    title: CommonAttachmentTitle,
    originFilename: CommonAttachmentOriginFilename,
    filename: CommonAttachmentFilename,
    mimetype: CommonAttachmentMimetype,
    extension: CommonAttachmentExtension,
    relativePathSegments: CommonAttachmentRelativePathSegments,
    width: CommonAttachmentWidth,
    height: CommonAttachmentHeight,
    size: CommonAttachmentSize,
    url: CommonAttachmentUrl,
    isCropable: CommonAttachmentIsCropable,
    libraryId: CommonAttachmentLibraryId,
    libraryFilename: CommonAttachmentLibraryFilename,
    sizes: CommonAttachmentSizes,
    meta: CommonAttachmentMeta,
    createdAt: CommonAttachmentCreatedAt,
    updatedAt: CommonAttachmentUpdatedAt,
    deletedAt: CommonAttachmentDeletedAt,
    family?: CommonAttachmentFamily,
    lang?: CommonLang,
    library?: CommonAttachmentLibrary,
  ) {
    super();
    this.id = id;
    this.familyId = familyId;
    this.attachableId = attachableId;
    this.langId = langId;
    this.sort = sort;
    this.alt = alt;
    this.title = title;
    this.originFilename = originFilename;
    this.filename = filename;
    this.mimetype = mimetype;
    this.extension = extension;
    this.relativePathSegments = relativePathSegments;
    this.width = width;
    this.height = height;
    this.size = size;
    this.url = url;
    this.isCropable = isCropable;
    this.libraryId = libraryId;
    this.libraryFilename = libraryFilename;
    this.sizes = sizes;
    this.meta = meta;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.family = family;
    this.lang = lang;
    this.library = library;
  }

  static register(
    id: CommonAttachmentId,
    familyId: CommonAttachmentFamilyId,
    attachableId: CommonAttachmentAttachableId,
    langId: CommonAttachmentLangId,
    sort: CommonAttachmentSort,
    alt: CommonAttachmentAlt,
    title: CommonAttachmentTitle,
    originFilename: CommonAttachmentOriginFilename,
    filename: CommonAttachmentFilename,
    mimetype: CommonAttachmentMimetype,
    extension: CommonAttachmentExtension,
    relativePathSegments: CommonAttachmentRelativePathSegments,
    width: CommonAttachmentWidth,
    height: CommonAttachmentHeight,
    size: CommonAttachmentSize,
    url: CommonAttachmentUrl,
    isCropable: CommonAttachmentIsCropable,
    libraryId: CommonAttachmentLibraryId,
    libraryFilename: CommonAttachmentLibraryFilename,
    sizes: CommonAttachmentSizes,
    meta: CommonAttachmentMeta,
    createdAt: CommonAttachmentCreatedAt,
    updatedAt: CommonAttachmentUpdatedAt,
    deletedAt: CommonAttachmentDeletedAt,
    family?: CommonAttachmentFamily,
    lang?: CommonLang,
    library?: CommonAttachmentLibrary,
  ): CommonAttachment {
    return new CommonAttachment(
      id,
      familyId,
      attachableId,
      langId,
      sort,
      alt,
      title,
      originFilename,
      filename,
      mimetype,
      extension,
      relativePathSegments,
      width,
      height,
      size,
      url,
      isCropable,
      libraryId,
      libraryFilename,
      sizes,
      meta,
      createdAt,
      updatedAt,
      deletedAt,
      family,
      lang,
      library,
    );
  }

  created(attachment: CommonAttachment): void {
    this.apply(
      new CommonCreatedAttachmentEvent(
        attachment.id.value,
        attachment.familyId?.value,
        attachment.attachableId.value,
        attachment.langId?.value,
        attachment.sort?.value,
        attachment.alt?.value,
        attachment.title?.value,
        attachment.originFilename.value,
        attachment.filename.value,
        attachment.mimetype.value,
        attachment.extension.value,
        attachment.relativePathSegments.value,
        attachment.width?.value,
        attachment.height?.value,
        attachment.size.value,
        attachment.url.value,
        attachment.isCropable.value,
        attachment.libraryId?.value,
        attachment.libraryFilename?.value,
        attachment.sizes?.value,
        attachment.meta?.value,
        attachment.createdAt?.value,
        attachment.updatedAt?.value,
        attachment.deletedAt?.value,
      ),
    );
  }

  updated(attachment: CommonAttachment): void {
    this.apply(
      new CommonUpdatedAttachmentEvent(
        attachment.id?.value,
        attachment.familyId?.value,
        attachment.attachableId?.value,
        attachment.langId?.value,
        attachment.sort?.value,
        attachment.alt?.value,
        attachment.title?.value,
        attachment.originFilename?.value,
        attachment.filename?.value,
        attachment.mimetype?.value,
        attachment.extension?.value,
        attachment.relativePathSegments?.value,
        attachment.width?.value,
        attachment.height?.value,
        attachment.size?.value,
        attachment.url?.value,
        attachment.isCropable?.value,
        attachment.libraryId?.value,
        attachment.libraryFilename?.value,
        attachment.sizes?.value,
        attachment.meta?.value,
        attachment.createdAt?.value,
        attachment.updatedAt?.value,
        attachment.deletedAt?.value,
      ),
    );
  }

  deleted(attachment: CommonAttachment): void {
    this.apply(
      new CommonDeletedAttachmentEvent(
        attachment.id.value,
        attachment.familyId?.value,
        attachment.attachableId.value,
        attachment.langId?.value,
        attachment.sort?.value,
        attachment.alt?.value,
        attachment.title?.value,
        attachment.originFilename.value,
        attachment.filename.value,
        attachment.mimetype.value,
        attachment.extension.value,
        attachment.relativePathSegments.value,
        attachment.width?.value,
        attachment.height?.value,
        attachment.size.value,
        attachment.url.value,
        attachment.isCropable.value,
        attachment.libraryId?.value,
        attachment.libraryFilename?.value,
        attachment.sizes?.value,
        attachment.meta?.value,
        attachment.createdAt?.value,
        attachment.updatedAt?.value,
        attachment.deletedAt?.value,
      ),
    );
  }

  toDTO(): LiteralObject {
    return {
      id: this.id.value,
      familyId: this.familyId?.value,
      attachableId: this.attachableId.value,
      langId: this.langId?.value,
      sort: this.sort?.value,
      alt: this.alt?.value,
      title: this.title?.value,
      originFilename: this.originFilename.value,
      filename: this.filename.value,
      mimetype: this.mimetype.value,
      extension: this.extension.value,
      relativePathSegments: this.relativePathSegments.value,
      width: this.width?.value,
      height: this.height?.value,
      size: this.size.value,
      url: this.url.value,
      isCropable: this.isCropable.value,
      libraryId: this.libraryId?.value,
      libraryFilename: this.libraryFilename?.value,
      sizes: this.sizes?.value,
      meta: this.meta?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      family: this.family?.toDTO(),
      lang: this.lang?.toDTO(),
      library: this.library?.toDTO(),
    };
  }

  // function called to get data for repository side effect methods
  toRepository(): LiteralObject {
    return {
      id: this.id.value,
      familyId: this.familyId?.value,
      attachableId: this.attachableId.value,
      langId: this.langId?.value,
      sort: this.sort?.value,
      alt: this.alt?.value,
      title: this.title?.value,
      originFilename: this.originFilename.value,
      filename: this.filename.value,
      mimetype: this.mimetype.value,
      extension: this.extension.value,
      relativePathSegments: this.relativePathSegments.value,
      width: this.width?.value,
      height: this.height?.value,
      size: this.size.value,
      url: this.url.value,
      isCropable: this.isCropable.value,
      libraryId: this.libraryId?.value,
      libraryFilename: this.libraryFilename?.value,
      sizes: this.sizes?.value,
      meta: this.meta?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
      deletedAt: this.deletedAt?.value,
      family: this.family?.toDTO(),
      lang: this.lang?.toDTO(),
      library: this.library?.toDTO(),
    };
  }
}
