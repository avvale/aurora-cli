import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
export class CreateLangsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository,
    ) {}

    async main(
        langs: {
            id: LangId;
            name: LangName;
            image: LangImage;
            iso6392: LangIso6392;
            iso6393: LangIso6393;
            ietf: LangIetf;
            customCode: LangCustomCode;
            dir: LangDir;
            sort: LangSort;
            isActive: LangIsActive;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateLangs = langs.map(lang => CommonLang.register(
            lang.id,
            lang.name,
            lang.image,
            lang.iso6392,
            lang.iso6393,
            lang.ietf,
            lang.customCode,
            lang.dir,
            lang.sort,
            lang.isActive,
            new LangCreatedAt({ currentTimestamp: true }),
            new LangUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateLangs, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddLangsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const langsRegistered = this.publisher.mergeObjectContext(new AddLangsContextEvent(aggregateLangs));

        langsRegistered.created(); // apply event to model events
        langsRegistered.commit(); // commit all events of model
    }
}