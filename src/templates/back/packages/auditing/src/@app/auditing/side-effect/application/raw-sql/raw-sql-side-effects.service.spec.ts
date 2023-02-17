import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLSideEffectsService } from './raw-sql-side-effects.service';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { MockSideEffectRepository } from '../../infrastructure/mock/mock-side-effect.repository';

describe('RawSQLSideEffectsService', () =>
{
    let service: RawSQLSideEffectsService;
    let repository: ISideEffectRepository;
    let mockRepository: MockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLSideEffectsService,
                MockSideEffectRepository,
                {
                    provide : ISideEffectRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLSideEffectsService);
        repository      = module.get(ISideEffectRepository);
        mockRepository  = module.get(MockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('RawSQLSideEffectsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get sideEffects', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});