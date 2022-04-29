/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { boundedContexts } from '../../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { DeleteBoundedContextByIdService } from './delete-bounded-context-by-id.service';
import { BoundedContextId } from '../../domain/value-objects';
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';
import { MockBoundedContextRepository } from '../../infrastructure/mock/mock-bounded-context.repository';

describe('DeleteBoundedContextByIdService', () =>
{
    let service: DeleteBoundedContextByIdService;
    let repository: IBoundedContextRepository;
    let mockRepository: MockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteBoundedContextByIdService,
                MockBoundedContextRepository,
                {
                    provide : IBoundedContextRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    }
                },
            ]
        }).compile();

        service         = module.get(DeleteBoundedContextByIdService);
        repository      = module.get(IBoundedContextRepository);
        mockRepository  = module.get(MockBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('DeleteBoundedContextByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete boundedContext and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new BoundedContextId(boundedContexts[0].id)
            )).toBe(undefined);
        });
    });
});