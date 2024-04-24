import { QueueManagerIQueueRepository, QueueManagerMockQueueRepository, QueueManagerSumQueueQuery } from '@app/queue-manager/queue';
import { QueueManagerSumQueueQueryHandler } from '@app/queue-manager/queue/application/sum/queue-manager-sum-queue.query-handler';
import { QueueManagerSumQueueService } from '@app/queue-manager/queue/application/sum/queue-manager-sum-queue.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerSumQueueQueryHandler', () =>
{
    let queryHandler: QueueManagerSumQueueQueryHandler;
    let service: QueueManagerSumQueueService;
    let repository: QueueManagerMockQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerSumQueueQueryHandler,
                {
                    provide : QueueManagerIQueueRepository,
                    useClass: QueueManagerMockQueueRepository,
                },
                {
                    provide : QueueManagerSumQueueService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerSumQueueQueryHandler>(QueueManagerSumQueueQueryHandler);
        service = module.get<QueueManagerSumQueueService>(QueueManagerSumQueueService);
        repository = <QueueManagerMockQueueRepository>module.get<QueueManagerIQueueRepository>(QueueManagerIQueueRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerSumQueueQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new QueueManagerSumQueueQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
