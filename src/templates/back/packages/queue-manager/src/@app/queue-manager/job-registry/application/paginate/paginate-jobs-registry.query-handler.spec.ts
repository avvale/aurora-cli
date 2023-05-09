import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@aurora-ts/core';

// custom items
import { PaginateJobsRegistryQueryHandler } from './paginate-jobs-registry.query-handler';
import { MockJobRegistryRepository } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.repository';
import { IJobRegistryRepository } from '@app/queue-manager/job-registry/domain/job-registry.repository';
import { JobRegistryMapper } from '@app/queue-manager/job-registry/domain/job-registry.mapper';
import { PaginateJobsRegistryQuery } from './paginate-jobs-registry.query';
import { PaginateJobsRegistryService } from './paginate-jobs-registry.service';

describe('PaginateJobsRegistryQueryHandler', () =>
{
    let queryHandler: PaginateJobsRegistryQueryHandler;
    let service: PaginateJobsRegistryService;
    let repository: MockJobRegistryRepository;
    let mapper: JobRegistryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaginateJobsRegistryQueryHandler,
                {
                    provide : IJobRegistryRepository,
                    useClass: MockJobRegistryRepository,
                },
                {
                    provide : PaginateJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<PaginateJobsRegistryQueryHandler>(PaginateJobsRegistryQueryHandler);
        service = module.get<PaginateJobsRegistryService>(PaginateJobsRegistryService);
        repository = <MockJobRegistryRepository>module.get<IJobRegistryRepository>(IJobRegistryRepository);
        mapper = new JobRegistryMapper();
    });

    describe('main', () =>
    {
        test('PaginateJobsRegistryQueryHandler should be defined', () =>
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
                new PaginateJobsRegistryQuery(
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