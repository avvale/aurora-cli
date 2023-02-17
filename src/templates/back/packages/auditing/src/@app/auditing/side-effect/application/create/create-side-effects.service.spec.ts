/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateSideEffectsService } from './create-side-effects.service';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { MockSideEffectRepository } from '../../infrastructure/mock/mock-side-effect.repository';

describe('CreateSideEffectsService', () =>
{
    let service: CreateSideEffectsService;
    let repository: ISideEffectRepository;
    let mockRepository: MockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateSideEffectsService,
                MockSideEffectRepository,
                {
                    provide : ISideEffectRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CreateSideEffectsService);
        repository      = module.get(ISideEffectRepository);
        mockRepository  = module.get(MockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('CreateSideEffectsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create sideEffects and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource,
            )).toBe(undefined);
        });
    });
});