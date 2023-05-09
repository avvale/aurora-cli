import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetQueuesService } from './get-queues.service';
import { IQueueRepository } from '../../domain/queue.repository';
import { MockQueueRepository } from '../../infrastructure/mock/mock-queue.repository';

describe('GetQueuesService', () =>
{
    let service: GetQueuesService;
    let repository: IQueueRepository;
    let mockRepository: MockQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetQueuesService,
                MockQueueRepository,
                {
                    provide : IQueueRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(GetQueuesService);
        repository = module.get(IQueueRepository);
        mockRepository = module.get(MockQueueRepository);
    });

    describe('main', () =>
    {
        test('GetQueuesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get queues', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});