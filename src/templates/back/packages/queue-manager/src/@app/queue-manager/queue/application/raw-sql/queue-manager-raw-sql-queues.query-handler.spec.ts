import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerMockQueueRepository } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.repository';
import { QueueManagerIQueueRepository } from '@app/queue-manager/queue/domain/queue-manager-queue.repository';
import { QueueManagerQueueMapper } from '@app/queue-manager/queue/domain/queue-manager-queue.mapper';
import { QueueManagerRawSQLQueuesQueryHandler } from './queue-manager-raw-sql-queues.query-handler';
import { QueueManagerRawSQLQueuesQuery } from './queue-manager-raw-sql-queues.query';
import { QueueManagerRawSQLQueuesService } from './queue-manager-raw-sql-queues.service';

describe('RawSQLQueuesQueryHandler', () =>
{
    let queryHandler: QueueManagerRawSQLQueuesQueryHandler;
    let service: QueueManagerRawSQLQueuesService;
    let repository: QueueManagerMockQueueRepository;
    let mapper: QueueManagerQueueMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerRawSQLQueuesQueryHandler,
                {
                    provide : QueueManagerIQueueRepository,
                    useClass: QueueManagerMockQueueRepository,
                },
                {
                    provide : QueueManagerRawSQLQueuesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerRawSQLQueuesQueryHandler>(QueueManagerRawSQLQueuesQueryHandler);
        service = module.get<QueueManagerRawSQLQueuesService>(QueueManagerRawSQLQueuesService);
        repository = <QueueManagerMockQueueRepository>module.get<QueueManagerIQueueRepository>(QueueManagerIQueueRepository);
        mapper = new QueueManagerQueueMapper();
    });

    describe('main', () =>
    {
        test('QueueManagerRawSQLQueuesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an queues founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new QueueManagerRawSQLQueuesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
