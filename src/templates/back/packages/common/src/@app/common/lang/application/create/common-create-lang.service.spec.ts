/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { CreateLangService } from './create-lang.service';
import {
    CommonLangId,
    CommonLangName,
    CommonLangImage,
    CommonLangIso6392,
    CommonLangIso6393,
    CommonLangIetf,
    CommonLangCustomCode,
    CommonLangDir,
    CommonLangSort,
    CommonLangIsActive,
    CommonLangCreatedAt,
    CommonLangUpdatedAt,
    CommonLangDeletedAt,
} from '../../domain/value-objects';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { MockLangRepository } from '../../infrastructure/mock/mock-lang.repository';

describe('CommonCreateLangService', () =>

{
    let service: CreateLangService;
    let repository: CommonILangRepository;
    let mockRepository: MockLangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateLangService,
                MockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CreateLangService);
        repository = module.get(CommonILangRepository);
        mockRepository = module.get(MockLangRepository);
    });

    describe('main', () =>
    {
        test('CreateLangService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a lang and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new CommonLangId(langs[0].id),
                    name: new CommonLangName(langs[0].name),
                    image: new CommonLangImage(langs[0].image),
                    iso6392: new CommonLangIso6392(langs[0].iso6392),
                    iso6393: new CommonLangIso6393(langs[0].iso6393),
                    ietf: new CommonLangIetf(langs[0].ietf),
                    customCode: new CommonLangCustomCode(langs[0].customCode),
                    dir: new CommonLangDir(langs[0].dir),
                    sort: new CommonLangSort(langs[0].sort),
                    isActive: new CommonLangIsActive(langs[0].isActive),
                },
            )).toBe(undefined);
        });
    });
});