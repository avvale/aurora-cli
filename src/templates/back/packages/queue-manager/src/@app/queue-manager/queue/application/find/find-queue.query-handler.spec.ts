import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindQueueQueryHandler } from './find-queue.query-handler';
import { MockQueueRepository } from '@app/queue-manager/queue/infrastructure/mock/mock-queue.repository';
import { IQueueRepository } from '@app/queue-manager/queue/domain/queue.repository';
import { QueueMapper } from '@app/queue-manager/queue/domain/queue.mapper';
import { FindQueueQuery } from './find-queue.query';
import { FindQueueService } from './find-queue.service';

describe('FindQueueQueryHandler', () =>
{
    let queryHandler: FindQueueQueryHandler;
    let service: FindQueueService;
    let repository: MockQueueRepository;
    let mapper: QueueMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindQueueQueryHandler,
                {
                    provide : IQueueRepository,
                    useClass: MockQueueRepository,
                },
                {
                    provide : FindQueueService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<FindQueueQueryHandler>(FindQueueQueryHandler);
        service = module.get<FindQueueService>(FindQueueService);
        repository = <MockQueueRepository>module.get<IQueueRepository>(IQueueRepository);
        mapper = new QueueMapper();
    });

    describe('main', () =>
    {
        test('FindQueueQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an queue founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindQueueQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});