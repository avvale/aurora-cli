import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindSideEffectService } from './find-side-effect.service';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { MockSideEffectRepository } from '../../infrastructure/mock/mock-side-effect.repository';

describe('FindSideEffectService', () =>
{
    let service: FindSideEffectService;
    let repository: ISideEffectRepository;
    let mockRepository: MockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindSideEffectService,
                MockSideEffectRepository,
                {
                    provide : ISideEffectRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(FindSideEffectService);
        repository = module.get(ISideEffectRepository);
        mockRepository = module.get(MockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('FindSideEffectService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find sideEffect', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});