import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindQueueQueryHandler } from './queue-manager-find-queue.query-handler';
import { QueueManagerMockQueueRepository } from '@app/queue-manager/queue/infrastructure/mock/queue-manager-mock-queue.repository';
import { QueueManagerIQueueRepository } from '@app/queue-manager/queue/domain/queue-manager-queue.repository';
import { QueueManagerQueueMapper } from '@app/queue-manager/queue/domain/queue-manager-queue.mapper';
import { QueueManagerFindQueueQuery } from './queue-manager-find-queue.query';
import { QueueManagerFindQueueService } from './queue-manager-find-queue.service';

describe('QueueManagerFindQueueQueryHandler', () =>
{
    let queryHandler: QueueManagerFindQueueQueryHandler;
    let service: QueueManagerFindQueueService;
    let repository: QueueManagerMockQueueRepository;
    let mapper: QueueManagerQueueMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerFindQueueQueryHandler,
                {
                    provide : QueueManagerIQueueRepository,
                    useClass: QueueManagerMockQueueRepository,
                },
                {
                    provide : QueueManagerFindQueueService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerFindQueueQueryHandler>(QueueManagerFindQueueQueryHandler);
        service = module.get<QueueManagerFindQueueService>(QueueManagerFindQueueService);
        repository = <QueueManagerMockQueueRepository>module.get<QueueManagerIQueueRepository>(QueueManagerIQueueRepository);
        mapper = new QueueManagerQueueMapper();
    });

    describe('main', () =>
    {
        test('QueueManagerFindQueueQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an queue founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new QueueManagerFindQueueQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
