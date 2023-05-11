import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    LangId,
    LangName,
    LangImage,
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangCustomCode,
    LangDir,
    LangSort,
    LangIsActive,
    LangCreatedAt,
    LangUpdatedAt,
    LangDeletedAt,
} from '../../domain/value-objects';
import { ILangRepository } from '../../domain/lang.repository';
import { CommonLang } from '../../domain/lang.aggregate';
import { AddLangsContextEvent } from '../events/add-langs-context.event';

@Injectable()
export class UpdateLangsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository,
    ) {}

    async main(
        payload: {
            id?: LangId;
            name?: LangName;
            image?: LangImage;
            iso6392?: LangIso6392;
            iso6393?: LangIso6393;
            ietf?: LangIetf;
            customCode?: LangCustomCode;
            dir?: LangDir;
            sort?: LangSort;
            isActive?: LangIsActive;
        },
        queryStatement?: QueryStatement,
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
            new LangUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(lang, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const langs = await this.repository.get({ queryStatement, constraint, cQMetadata });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const langsRegister = this.publisher.mergeObjectContext(
            new AddLangsContextEvent(langs),
        );

        langsRegister.updated(); // apply event to model events
        langsRegister.commit(); // commit all events of model
    }
}