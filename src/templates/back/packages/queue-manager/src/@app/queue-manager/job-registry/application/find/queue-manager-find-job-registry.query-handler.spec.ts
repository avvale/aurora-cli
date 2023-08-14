import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerFindJobRegistryQueryHandler } from './queue-manager-find-job-registry.query-handler';
import { QueueManagerMockJobRegistryRepository } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.repository';
import { QueueManagerIJobRegistryRepository } from '@app/queue-manager/job-registry/domain/queue-manager-job-registry.repository';
import { QueueManagerJobRegistryMapper } from '@app/queue-manager/job-registry/domain/queue-manager-job-registry.mapper';
import { QueueManagerFindJobRegistryQuery } from './queue-manager-find-job-registry.query';
import { QueueManagerFindJobRegistryService } from './queue-manager-find-job-registry.service';

describe('QueueManagerFindJobRegistryQueryHandler', () =>
{
    let queryHandler: QueueManagerFindJobRegistryQueryHandler;
    let service: QueueManagerFindJobRegistryService;
    let repository: QueueManagerMockJobRegistryRepository;
    let mapper: QueueManagerJobRegistryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerFindJobRegistryQueryHandler,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useClass: QueueManagerMockJobRegistryRepository,
                },
                {
                    provide : QueueManagerFindJobRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerFindJobRegistryQueryHandler>(QueueManagerFindJobRegistryQueryHandler);
        service = module.get<QueueManagerFindJobRegistryService>(QueueManagerFindJobRegistryService);
        repository = <QueueManagerMockJobRegistryRepository>module.get<QueueManagerIJobRegistryRepository>(QueueManagerIJobRegistryRepository);
        mapper = new QueueManagerJobRegistryMapper();
    });

    describe('main', () =>
    {
        test('QueueManagerFindJobRegistryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobRegistry founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new QueueManagerFindJobRegistryQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
