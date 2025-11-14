import {
    QueueManagerFindQueueByIdQuery,
    QueueManagerIQueueRepository,
    queueManagerMockQueueData,
    QueueManagerMockQueueRepository,
    QueueManagerQueueMapper,
} from '@app/queue-manager/queue';
import { QueueManagerFindQueueByIdQueryHandler } from '@app/queue-manager/queue/application/find/queue-manager-find-queue-by-id.query-handler';
import { QueueManagerFindQueueByIdService } from '@app/queue-manager/queue/application/find/queue-manager-find-queue-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerFindQueueByIdQueryHandler', () => {
    let queryHandler: QueueManagerFindQueueByIdQueryHandler;
    let service: QueueManagerFindQueueByIdService;
    let repository: QueueManagerMockQueueRepository;
    let mapper: QueueManagerQueueMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerFindQueueByIdQueryHandler,
                {
                    provide: QueueManagerIQueueRepository,
                    useClass: QueueManagerMockQueueRepository,
                },
                {
                    provide: QueueManagerFindQueueByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<QueueManagerFindQueueByIdQueryHandler>(
            QueueManagerFindQueueByIdQueryHandler,
        );
        service = module.get<QueueManagerFindQueueByIdService>(
            QueueManagerFindQueueByIdService,
        );
        repository = <QueueManagerMockQueueRepository>(
            module.get<QueueManagerIQueueRepository>(
                QueueManagerIQueueRepository,
            )
        );
        mapper = new QueueManagerQueueMapper();
    });

    describe('main', () => {
        test('FindQueueByIdQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an queue founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new QueueManagerFindQueueByIdQuery(
                        queueManagerMockQueueData[0].id,
                    ),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
