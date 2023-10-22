import { QueueManagerIJobRegistryRepository, QueueManagerJobRegistryMapper, QueueManagerMockJobRegistryRepository, QueueManagerRawSQLJobsRegistryQuery } from '@app/queue-manager/job-registry';
import { QueueManagerRawSQLJobsRegistryQueryHandler } from '@app/queue-manager/job-registry/application/raw-sql/queue-manager-raw-sql-jobs-registry.query-handler';
import { QueueManagerRawSQLJobsRegistryService } from '@app/queue-manager/job-registry/application/raw-sql/queue-manager-raw-sql-jobs-registry.service';
import { Test, TestingModule } from '@nestjs/testing';

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
