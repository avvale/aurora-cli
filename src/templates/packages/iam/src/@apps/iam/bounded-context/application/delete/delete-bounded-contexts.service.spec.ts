/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteBoundedContextsService } from './delete-bounded-contexts.service';
import { IBoundedContextRepository } from '../../domain/bounded-context.repository';
import { MockBoundedContextRepository } from '../../infrastructure/mock/mock-bounded-context.repository';

describe('DeleteBoundedContextsService', () =>
{
    let service: DeleteBoundedContextsService;
    let repository: IBoundedContextRepository;
    let mockRepository: MockBoundedContextRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteBoundedContextsService,
                MockBoundedContextRepository,
                {
                    provide : IBoundedContextRepository,
                    useValue: {
                        get   : (queryStatement) => { /**/ },
                        delete: (queryStatement) => { /**/ },
                    }
                },
            ],
        }).compile();

        service         = module.get(DeleteBoundedContextsService);
        repository      = module.get(IBoundedContextRepository);
        mockRepository  = module.get(MockBoundedContextRepository);
    });

    describe('main', () =>
    {
        test('DeleteBoundedContextsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete boundedContext and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});