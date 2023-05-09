/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteQueuesService } from './delete-queues.service';
import { IQueueRepository } from '../../domain/queue.repository';
import { MockQueueRepository } from '../../infrastructure/mock/mock-queue.repository';

describe('DeleteQueuesService', () =>
{
    let service: DeleteQueuesService;
    let repository: IQueueRepository;
    let mockRepository: MockQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteQueuesService,
                MockQueueRepository,
                {
                    provide : IQueueRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(DeleteQueuesService);
        repository = module.get(IQueueRepository);
        mockRepository = module.get(MockQueueRepository);
    });

    describe('main', () =>
    {
        test('DeleteQueuesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete queue and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});