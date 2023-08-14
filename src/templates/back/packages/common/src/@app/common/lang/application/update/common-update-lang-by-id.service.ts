import { CommonILangRepository, CommonLang } from '@app/common/lang';
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
    CommonLangSort,
    CommonLangUpdatedAt,
} from '@app/common/lang/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonUpdateLangByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: CommonILangRepository,
    ) {}

    async main(
        payload: {
            id: CommonLangId;
            name?: CommonLangName;
            image?: CommonLangImage;
            iso6392?: CommonLangIso6392;
            iso6393?: CommonLangIso6393;
            ietf?: CommonLangIetf;
            customCode?: CommonLangCustomCode;
            dir?: CommonLangDir;
            sort?: CommonLangSort;
            isActive?: CommonLangIsActive;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
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
            null, // createdAt
            new CommonLangUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            lang,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const langRegister = this.publisher.mergeObjectContext(
            lang,
        );

        langRegister.updated(lang); // apply event to model events
        langRegister.commit(); // commit all events of model
    }
}
