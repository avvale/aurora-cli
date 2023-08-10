import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { QueueManagerRawSQLQueuesService } from './queue-manager-raw-sql-queues.service';
import { QueueManagerIQueueRepository } from '../../domain/queue-manager-queue.repository';
import { QueueManagerMockQueueRepository } from '../../infrastructure/mock/queue-manager-mock-queue.repository';

describe('QueueManagerRawSQLQueuesService ', () =>
{
    let service: QueueManagerRawSQLQueuesService ;
    let repository: QueueManagerIQueueRepository;
    let mockRepository: QueueManagerMockQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                QueueManagerRawSQLQueuesService ,
                QueueManagerMockQueueRepository,
                {
                    provide : QueueManagerIQueueRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(QueueManagerRawSQLQueuesService );
        repository      = module.get(QueueManagerIQueueRepository);
        mockRepository  = module.get(QueueManagerMockQueueRepository);
    });

    describe('main', () =>
    {
        test('RawSQLQueuesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get queues', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
