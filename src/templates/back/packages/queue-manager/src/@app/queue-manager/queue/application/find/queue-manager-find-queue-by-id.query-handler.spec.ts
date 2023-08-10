import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindQueueByIdQueryHandler } from './queue-manager-find-queue-by-id.query-handler';
import { QueueManagerMockQueueRepository } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.repository';
import { queueManagerMockQueueData } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.data';
import { QueueManagerIQueueRepository } from '@app/queue-manager/queue/domain/queue-manager-queue.repository';
import { QueueManagerQueueMapper } from '@app/queue-manager/queue/domain/queue-manager-queue.mapper';
import { QueueManagerFindQueueByIdQuery } from './queue-manager-find-queue-by-id.query';
import { QueueManagerFindQueueByIdService } from './queue-manager-find-queue-by-id.service';

describe('QueueManagerFindQueueByIdQueryHandler', () =>
{
    let queryHandler: QueueManagerFindQueueByIdQueryHandler;
    let service: QueueManagerFindQueueByIdService;
    let repository: QueueManagerMockQueueRepository;
    let mapper: QueueManagerQueueMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerFindQueueByIdQueryHandler,
                {
                    provide : QueueManagerIQueueRepository,
                    useClass: QueueManagerMockQueueRepository,
                },
                {
                    provide : QueueManagerFindQueueByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerFindQueueByIdQueryHandler>(QueueManagerFindQueueByIdQueryHandler);
        service = module.get<QueueManagerFindQueueByIdService>(QueueManagerFindQueueByIdService);
        repository = <QueueManagerMockQueueRepository>module.get<QueueManagerIQueueRepository>(QueueManagerIQueueRepository);
        mapper = new QueueManagerQueueMapper();
    });

    describe('main', () =>
    {
        test('FindQueueByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an queue founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new QueueManagerFindQueueByIdQuery(
                    queueManagerMockQueueData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
