import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerGetQueuesQueryHandler } from './queue-manager-get-queues.query-handler';
import { QueueManagerMockQueueRepository } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.repository';
import { QueueManagerIQueueRepository } from '@app/queue-manager/queue/domain/queue-manager-queue.repository';
import { QueueManagerQueueMapper } from '@app/queue-manager/queue/domain/queue-manager-queue.mapper';
import { QueueManagerGetQueuesQuery } from './queue-manager-get-queues.query';
import { QueueManagerGetQueuesService } from './queue-manager-get-queues.service';

describe('GetQueuesQueryHandler', () =>
{
    let queryHandler: QueueManagerGetQueuesQueryHandler;
    let service: QueueManagerGetQueuesService;
    let repository: QueueManagerMockQueueRepository;
    let mapper: QueueManagerQueueMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerGetQueuesQueryHandler,
                {
                    provide : QueueManagerIQueueRepository,
                    useClass: QueueManagerMockQueueRepository,
                },
                {
                    provide : QueueManagerGetQueuesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerGetQueuesQueryHandler>(QueueManagerGetQueuesQueryHandler);
        service = module.get<QueueManagerGetQueuesService>(QueueManagerGetQueuesService);
        repository = <QueueManagerMockQueueRepository>module.get<QueueManagerIQueueRepository>(QueueManagerIQueueRepository);
        mapper = new QueueManagerQueueMapper();
    });

    describe('main', () =>
    {
        test('QueueManagerGetQueuesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an queues founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new QueueManagerGetQueuesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});