import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurorajs.dev/core';
import { ILangRepository } from '../../domain/lang.repository';
import { CommonLang } from '../../domain/lang.aggregate';
import {
	LangCreatedAt,
	LangCustomCode,
	LangDeletedAt,
	LangDir,
	LangId,
	LangIetf,
	LangImage,
	LangIsActive,
	LangIso6392,
	LangIso6393,
	LangName,
	LangSort,
	LangUpdatedAt,
} from '../../domain/value-objects';

@Injectable()
export class CreateLangService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository,
    ) {}

    async main(
        payload: {
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
        },
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
            new LangCreatedAt({ currentTimestamp: true }),
            new LangUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            lang,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const langRegister = this.publisher.mergeObjectContext(
            lang,
        );

        langRegister.created(lang); // apply event to model events
        langRegister.commit(); // commit all events of model
    }
}