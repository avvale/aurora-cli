import { QueueManagerIQueueRepository, QueueManagerMockQueueRepository } from '@app/queue-manager/queue';
import { QueueManagerRawSQLQueuesService } from '@app/queue-manager/queue/application/raw-sql/queue-manager-raw-sql-queues.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

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
