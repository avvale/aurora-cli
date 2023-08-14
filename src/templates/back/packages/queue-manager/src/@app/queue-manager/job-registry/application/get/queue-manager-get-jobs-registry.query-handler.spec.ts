import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { QueueManagerGetJobsRegistryQueryHandler } from './queue-manager-get-jobs-registry.query-handler';
import { QueueManagerMockJobRegistryRepository } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.repository';
import { QueueManagerIJobRegistryRepository } from '@app/queue-manager/job-registry/domain/queue-manager-job-registry.repository';
import { QueueManagerJobRegistryMapper } from '@app/queue-manager/job-registry/domain/queue-manager-job-registry.mapper';
import { QueueManagerGetJobsRegistryQuery } from './queue-manager-get-jobs-registry.query';
import { QueueManagerGetJobsRegistryService } from './queue-manager-get-jobs-registry.service';

describe('GetJobsRegistryQueryHandler', () =>
{
    let queryHandler: QueueManagerGetJobsRegistryQueryHandler;
    let service: QueueManagerGetJobsRegistryService;
    let repository: QueueManagerMockJobRegistryRepository;
    let mapper: QueueManagerJobRegistryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerGetJobsRegistryQueryHandler,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useClass: QueueManagerMockJobRegistryRepository,
                },
                {
                    provide : QueueManagerGetJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerGetJobsRegistryQueryHandler>(QueueManagerGetJobsRegistryQueryHandler);
        service = module.get<QueueManagerGetJobsRegistryService>(QueueManagerGetJobsRegistryService);
        repository = <QueueManagerMockJobRegistryRepository>module.get<QueueManagerIJobRegistryRepository>(QueueManagerIJobRegistryRepository);
        mapper = new QueueManagerJobRegistryMapper();
    });

    describe('main', () =>
    {
        test('QueueManagerGetJobsRegistryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobsRegistry founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new QueueManagerGetJobsRegistryQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});