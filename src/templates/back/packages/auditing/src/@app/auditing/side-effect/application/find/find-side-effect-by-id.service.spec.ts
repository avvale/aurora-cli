import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';
import { FindSideEffectByIdService } from './find-side-effect-by-id.service';
import { SideEffectId } from '../../domain/value-objects';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { MockSideEffectRepository } from '../../infrastructure/mock/mock-side-effect.repository';

describe('FindSideEffectByIdService', () =>
{
    let service: FindSideEffectByIdService;
    let repository: ISideEffectRepository;
    let mockRepository: MockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindSideEffectByIdService,
                MockSideEffectRepository,
                {
                    provide : ISideEffectRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(FindSideEffectByIdService);
        repository      = module.get(ISideEffectRepository);
        mockRepository  = module.get(MockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('FindSideEffectByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find sideEffect by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new SideEffectId(sideEffects[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});