import {
    QueueManagerIQueueRepository,
    QueueManagerMockQueueRepository,
    QueueManagerPaginateQueuesQuery,
} from '@app/queue-manager/queue';
import { QueueManagerPaginateQueuesQueryHandler } from '@app/queue-manager/queue/application/paginate/queue-manager-paginate-queues.query-handler';
import { QueueManagerPaginateQueuesService } from '@app/queue-manager/queue/application/paginate/queue-manager-paginate-queues.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('QueueManagerPaginateQueuesQueryHandler', () => {
    let queryHandler: QueueManagerPaginateQueuesQueryHandler;
    let service: QueueManagerPaginateQueuesService;
    let repository: QueueManagerMockQueueRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerPaginateQueuesQueryHandler,
                {
                    provide: QueueManagerIQueueRepository,
                    useClass: QueueManagerMockQueueRepository,
                },
                {
                    provide: QueueManagerPaginateQueuesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<QueueManagerPaginateQueuesQueryHandler>(
            QueueManagerPaginateQueuesQueryHandler,
        );
        service = module.get<QueueManagerPaginateQueuesService>(
            QueueManagerPaginateQueuesService,
        );
        repository = <QueueManagerMockQueueRepository>(
            module.get<QueueManagerIQueueRepository>(
                QueueManagerIQueueRepository,
            )
        );
    });

    describe('main', () => {
        test('QueueManagerPaginateQueuesQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an queues paginated', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            count: 10,
                            total: 100,
                            rows: repository.collectionSource.slice(0, 10),
                        }),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new QueueManagerPaginateQueuesQuery({
                        offset: 0,
                        limit: 10,
                    }),
                ),
            ).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource
                        .slice(0, 10)
                        .map((item) => item.toDTO()),
                ),
            );
        });
    });
});
