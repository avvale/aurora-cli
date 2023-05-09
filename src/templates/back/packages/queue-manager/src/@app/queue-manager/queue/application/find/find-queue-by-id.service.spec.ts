import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { queues } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.data';
import { FindQueueByIdService } from './find-queue-by-id.service';
import { QueueId } from '../../domain/value-objects';
import { IQueueRepository } from '../../domain/queue.repository';
import { MockQueueRepository } from '../../infrastructure/mock/mock-queue.repository';

describe('FindQueueByIdService', () =>
{
    let service: FindQueueByIdService;
    let repository: IQueueRepository;
    let mockRepository: MockQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindQueueByIdService,
                MockQueueRepository,
                {
                    provide : IQueueRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(FindQueueByIdService);
        repository = module.get(IQueueRepository);
        mockRepository = module.get(MockQueueRepository);
    });

    describe('main', () =>
    {
        test('FindQueueByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find queue by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new QueueId(queues[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});