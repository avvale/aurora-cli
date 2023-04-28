/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';
import { DeleteSideEffectByIdService } from './delete-side-effect-by-id.service';
import { SideEffectId } from '../../domain/value-objects';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { MockSideEffectRepository } from '../../infrastructure/mock/mock-side-effect.repository';

describe('DeleteSideEffectByIdService', () =>
{
    let service: DeleteSideEffectByIdService;
    let repository: ISideEffectRepository;
    let mockRepository: MockSideEffectRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteSideEffectByIdService,
                MockSideEffectRepository,
                {
                    provide : ISideEffectRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(DeleteSideEffectByIdService);
        repository = module.get(ISideEffectRepository);
        mockRepository = module.get(MockSideEffectRepository);
    });

    describe('main', () =>
    {
        test('DeleteSideEffectByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete sideEffect and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new SideEffectId(sideEffects[0].id),
            )).toBe(undefined);
        });
    });
});