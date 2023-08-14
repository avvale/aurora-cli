import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindJobRegistryByIdQueryHandler } from './queue-manager-find-job-registry-by-id.query-handler';
import { QueueManagerMockJobRegistryRepository } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.repository';
import { queueManagerMockJobRegistryData } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.data';
import { QueueManagerIJobRegistryRepository } from '@app/queue-manager/job-registry/domain/queue-manager-job-registry.repository';
import { QueueManagerJobRegistryMapper } from '@app/queue-manager/job-registry/domain/queue-manager-job-registry.mapper';
import { QueueManagerFindJobRegistryByIdQuery } from './queue-manager-find-job-registry-by-id.query';
import { QueueManagerFindJobRegistryByIdService } from './queue-manager-find-job-registry-by-id.service';

describe('QueueManagerFindJobRegistryByIdQueryHandler', () =>
{
    let queryHandler: QueueManagerFindJobRegistryByIdQueryHandler;
    let service: QueueManagerFindJobRegistryByIdService;
    let repository: QueueManagerMockJobRegistryRepository;
    let mapper: QueueManagerJobRegistryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerFindJobRegistryByIdQueryHandler,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useClass: QueueManagerMockJobRegistryRepository,
                },
                {
                    provide : QueueManagerFindJobRegistryByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerFindJobRegistryByIdQueryHandler>(QueueManagerFindJobRegistryByIdQueryHandler);
        service = module.get<QueueManagerFindJobRegistryByIdService>(QueueManagerFindJobRegistryByIdService);
        repository = <QueueManagerMockJobRegistryRepository>module.get<QueueManagerIJobRegistryRepository>(QueueManagerIJobRegistryRepository);
        mapper = new QueueManagerJobRegistryMapper();
    });

    describe('main', () =>
    {
        test('FindJobRegistryByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobRegistry founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new QueueManagerFindJobRegistryByIdQuery(
                    queueManagerMockJobRegistryData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
