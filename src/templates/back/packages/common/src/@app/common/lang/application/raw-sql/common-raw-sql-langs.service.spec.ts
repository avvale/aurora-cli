import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLLangsService } from './raw-sql-langs.service';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { MockLangRepository } from '../../infrastructure/mock/mock-lang.repository';

describe('RawSQLLangsService', () =>
{
    let service: RawSQLLangsService;
    let repository: CommonILangRepository;
    let mockRepository: MockLangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLLangsService,
                MockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLLangsService);
        repository      = module.get(CommonILangRepository);
        mockRepository  = module.get(MockLangRepository);
    });

    describe('main', () =>
    {
        test('RawSQLLangsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get langs', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});