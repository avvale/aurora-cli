import { QueueManagerIQueueRepository, QueueManagerMaxQueueQuery, QueueManagerMockQueueRepository } from '@app/queue-manager/queue';
import { QueueManagerMaxQueueQueryHandler } from '@app/queue-manager/queue/application/max/queue-manager-max-queue.query-handler';
import { QueueManagerMaxQueueService } from '@app/queue-manager/queue/application/max/queue-manager-max-queue.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerMaxQueueQueryHandler', () =>
{
    let queryHandler: QueueManagerMaxQueueQueryHandler;
    let service: QueueManagerMaxQueueService;
    let repository: QueueManagerMockQueueRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerMaxQueueQueryHandler,
                {
                    provide : QueueManagerIQueueRepository,
                    useClass: QueueManagerMockQueueRepository,
                },
                {
                    provide : QueueManagerMaxQueueService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerMaxQueueQueryHandler>(QueueManagerMaxQueueQueryHandler);
        service = module.get<QueueManagerMaxQueueService>(QueueManagerMaxQueueService);
        repository = <QueueManagerMockQueueRepository>module.get<QueueManagerIQueueRepository>(QueueManagerIQueueRepository);
    });

    describe('main', () =>
    {
        test('QueueManagerMaxQueueQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new QueueManagerMaxQueueQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
