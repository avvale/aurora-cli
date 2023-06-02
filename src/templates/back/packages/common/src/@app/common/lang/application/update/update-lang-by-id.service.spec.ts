/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { UpdateLangByIdService } from './update-lang-by-id.service';
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
import { MockLangRepository } from '../../infrastructure/mock/mock-lang.repository';

describe('UpdateLangByIdService', () =>
{
    let service: UpdateLangByIdService;
    let repository: ILangRepository;
    let mockRepository: MockLangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateLangByIdService,
                MockLangRepository,
                {
                    provide : ILangRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(UpdateLangByIdService);
        repository = module.get(ILangRepository);
        mockRepository = module.get(MockLangRepository);
    });

    describe('main', () =>
    {
        test('UpdateLangByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a lang and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new LangId(langs[0].id),
                    name: new LangName(langs[0].name),
                    image: new LangImage(langs[0].image),
                    iso6392: new LangIso6392(langs[0].iso6392),
                    iso6393: new LangIso6393(langs[0].iso6393),
                    ietf: new LangIetf(langs[0].ietf),
                    customCode: new LangCustomCode(langs[0].customCode),
                    dir: new LangDir(langs[0].dir),
                    sort: new LangSort(langs[0].sort),
                    isActive: new LangIsActive(langs[0].isActive),
                },
            )).toBe(undefined);
        });
    });
});