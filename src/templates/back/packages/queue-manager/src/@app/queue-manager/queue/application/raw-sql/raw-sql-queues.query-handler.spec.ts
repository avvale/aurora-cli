import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockQueueRepository } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.repository';
import { IQueueRepository } from '@app/queue-manager/queue/domain/queue.repository';
import { QueueMapper } from '@app/queue-manager/queue/domain/queue.mapper';
import { RawSQLQueuesQueryHandler } from './raw-sql-queues.query-handler';
import { RawSQLQueuesQuery } from './raw-sql-queues.query';
import { RawSQLQueuesService } from './raw-sql-queues.service';

describe('RawSQLQueuesQueryHandler', () =>
{
    let queryHandler: RawSQLQueuesQueryHandler;
    let service: RawSQLQueuesService;
    let repository: MockQueueRepository;
    let mapper: QueueMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLQueuesQueryHandler,
                {
                    provide : IQueueRepository,
                    useClass: MockQueueRepository,
                },
                {
                    provide : RawSQLQueuesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<RawSQLQueuesQueryHandler>(RawSQLQueuesQueryHandler);
        service = module.get<RawSQLQueuesService>(RawSQLQueuesService);
        repository = <MockQueueRepository>module.get<IQueueRepository>(IQueueRepository);
        mapper = new QueueMapper();
    });

    describe('main', () =>
    {
        test('RawSQLQueuesQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an queues founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLQueuesQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});