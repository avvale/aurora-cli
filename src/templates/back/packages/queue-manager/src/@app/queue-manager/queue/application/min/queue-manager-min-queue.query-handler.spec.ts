import { QueueManagerIQueueRepository, QueueManagerMinQueueQuery, QueueManagerMockQueueRepository } from '@app/queue-manager/queue';
import { QueueManagerMinQueueQueryHandler } from '@app/queue-manager/queue/application/min/queue-manager-min-queue.query-handler';
import { QueueManagerMinQueueService } from '@app/queue-manager/queue/application/min/queue-manager-min-queue.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerMinQueueQueryHandler', () =>
{
    let queryHandler: QueueManagerMinQueueQueryHandler;
    let service: QueueManagerMinQueueService;
    let repository: QueueManagerMockQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerMinQueueQueryHandler,
                {
                    provide : QueueManagerIQueueRepository,
                    useClass: QueueManagerMockQueueRepository,
                },
                {
                    provide : QueueManagerMinQueueService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerMinQueueQueryHandler>(QueueManagerMinQueueQueryHandler);
        service = module.get<QueueManagerMinQueueService>(QueueManagerMinQueueService);
        repository = <QueueManagerMockQueueRepository>module.get<QueueManagerIQueueRepository>(QueueManagerIQueueRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerMinQueueQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new QueueManagerMinQueueQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
