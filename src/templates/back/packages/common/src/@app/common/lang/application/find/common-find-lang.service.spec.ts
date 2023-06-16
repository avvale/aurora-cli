import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindLangService } from './common-find-lang.service';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { MockLangRepository } from '../../infrastructure/mock/mock-lang.repository';

describe('FindLangService', () =>
{
    let service: FindLangService;
    let repository: CommonILangRepository;
    let mockRepository: MockLangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindLangService,
                MockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(FindLangService);
        repository = module.get(CommonILangRepository);
        mockRepository = module.get(MockLangRepository);
    });

    describe('main', () =>
    {
        test('FindLangService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find lang', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});