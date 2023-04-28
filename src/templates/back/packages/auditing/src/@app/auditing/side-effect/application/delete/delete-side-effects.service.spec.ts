/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteSideEffectsService } from './delete-side-effects.service';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { MockSideEffectRepository } from '../../infrastructure/mock/mock-side-effect.repository';

describe('DeleteSideEffectsService', () =>
{
    let service: DeleteSideEffectsService;
    let repository: ISideEffectRepository;
    let mockRepository: MockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteSideEffectsService,
                MockSideEffectRepository,
                {
                    provide : ISideEffectRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(DeleteSideEffectsService);
        repository = module.get(ISideEffectRepository);
        mockRepository = module.get(MockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('DeleteSideEffectsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete sideEffect and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});