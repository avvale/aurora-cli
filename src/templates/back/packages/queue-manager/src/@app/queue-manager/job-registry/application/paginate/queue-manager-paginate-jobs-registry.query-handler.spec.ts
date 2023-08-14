import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurorajs.dev/core';

// custom items
import { QueueManagerPaginateJobsRegistryQueryHandler } from './queue-manager-paginate-jobs-registry.query-handler';
import { QueueManagerMockJobRegistryRepository } from '@app/queue-manager/job-registry/infrastructure/mock/queue-manager-mock-job-registry.repository';
import { QueueManagerIJobRegistryRepository } from '@app/queue-manager/job-registry/domain/queue-manager-job-registry.repository';
import { QueueManagerJobRegistryMapper } from '@app/queue-manager/job-registry/domain/queue-manager-job-registry.mapper';
import { QueueManagerPaginateJobsRegistryQuery } from './queue-manager-paginate-jobs-registry.query';
import { QueueManagerPaginateJobsRegistryService } from './queue-manager-paginate-jobs-registry.service';

describe('QueueManagerPaginateJobsRegistryQueryHandler', () =>
{
    let queryHandler: QueueManagerPaginateJobsRegistryQueryHandler;
    let service: QueueManagerPaginateJobsRegistryService;
    let repository: QueueManagerMockJobRegistryRepository;
    let mapper: QueueManagerJobRegistryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QueueManagerPaginateJobsRegistryQueryHandler,
                {
                    provide : QueueManagerIJobRegistryRepository,
                    useClass: QueueManagerMockJobRegistryRepository,
                },
                {
                    provide : QueueManagerPaginateJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<QueueManagerPaginateJobsRegistryQueryHandler>(QueueManagerPaginateJobsRegistryQueryHandler);
        service = module.get<QueueManagerPaginateJobsRegistryService>(QueueManagerPaginateJobsRegistryService);
        repository = <QueueManagerMockJobRegistryRepository>module.get<QueueManagerIJobRegistryRepository>(QueueManagerIJobRegistryRepository);
        mapper = new QueueManagerJobRegistryMapper();
    });

    describe('main', () =>
    {
        test('QueueManagerPaginateJobsRegistryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobsRegistry paginated', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(
                {
                    count: 10,
                    total: 100,
                    rows : repository.collectionSource.slice(0,10),
                },
            )));
            expect(await queryHandler.execute(
                new QueueManagerPaginateJobsRegistryQuery(
                    {
                        offset: 0,
                        limit : 10,
                    },
                ),
            )).toStrictEqual(
                new PaginationResponse(
                    100,
                    10,
                    repository.collectionSource.slice(0,10).map(item => item.toDTO()),
                ),
            );
        });
    });
});
