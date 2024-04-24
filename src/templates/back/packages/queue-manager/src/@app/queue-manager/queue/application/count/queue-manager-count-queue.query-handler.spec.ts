import { QueueManagerCountQueueQuery, QueueManagerIQueueRepository, QueueManagerMockQueueRepository } from '@app/queue-manager/queue';
import { QueueManagerCountQueueQueryHandler } from '@app/queue-manager/queue/application/count/queue-manager-count-queue.query-handler';
import { QueueManagerCountQueueService } from '@app/queue-manager/queue/application/count/queue-manager-count-queue.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerCountQueueQueryHandler', () =>
{
    let queryHandler: QueueManagerCountQueueQueryHandler;
    let service: QueueManagerCountQueueService;
    let repository: QueueManagerMockQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerCountQueueQueryHandler,
                {
                    provide : QueueManagerIQueueRepository,
                    useClass: QueueManagerMockQueueRepository,
                },
                {
                    provide : QueueManagerCountQueueService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerCountQueueQueryHandler>(QueueManagerCountQueueQueryHandler);
        service = module.get<QueueManagerCountQueueService>(QueueManagerCountQueueService);
        repository = <QueueManagerMockQueueRepository>module.get<QueueManagerIQueueRepository>(QueueManagerIQueueRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerCountQueueQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new QueueManagerCountQueueQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
