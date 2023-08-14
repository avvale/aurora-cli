import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerMockJobRegistryRepository } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.repository';
import { QueueManagerIJobRegistryRepository } from '@app/queue-manager/job-registry/domain/queue-manager-job-registry.repository';
import { QueueManagerJobRegistryMapper } from '@app/queue-manager/job-registry/domain/queue-manager-job-registry.mapper';
import { QueueManagerRawSQLJobsRegistryQueryHandler } from './queue-manager-raw-sql-jobs-registry.query-handler';
import { QueueManagerRawSQLJobsRegistryQuery } from './queue-manager-raw-sql-jobs-registry.query';
import { QueueManagerRawSQLJobsRegistryService } from './queue-manager-raw-sql-jobs-registry.service';

describe('RawSQLJobsRegistryQueryHandler', () =>
{
    let queryHandler: QueueManagerRawSQLJobsRegistryQueryHandler;
    let service: QueueManagerRawSQLJobsRegistryService;
    let repository: QueueManagerMockJobRegistryRepository;
    let mapper: QueueManagerJobRegistryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerRawSQLJobsRegistryQueryHandler,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useClass: QueueManagerMockJobRegistryRepository,
                },
                {
                    provide : QueueManagerRawSQLJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerRawSQLJobsRegistryQueryHandler>(QueueManagerRawSQLJobsRegistryQueryHandler);
        service = module.get<QueueManagerRawSQLJobsRegistryService>(QueueManagerRawSQLJobsRegistryService);
        repository = <QueueManagerMockJobRegistryRepository>module.get<QueueManagerIJobRegistryRepository>(QueueManagerIJobRegistryRepository);
        mapper = new QueueManagerJobRegistryMapper();
    });

    describe('main', () =>
    {
        test('QueueManagerRawSQLJobsRegistryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobsRegistry founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new QueueManagerRawSQLJobsRegistryQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});
