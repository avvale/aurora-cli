import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetJobsRegistryQueryHandler } from './get-jobs-registry.query-handler';
import { MockJobRegistryRepository } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.repository';
import { IJobRegistryRepository } from '@app/queue-manager/job-registry/domain/job-registry.repository';
import { JobRegistryMapper } from '@app/queue-manager/job-registry/domain/job-registry.mapper';
import { GetJobsRegistryQuery } from './get-jobs-registry.query';
import { GetJobsRegistryService } from './get-jobs-registry.service';

describe('GetJobsRegistryQueryHandler', () =>
{
    let queryHandler: GetJobsRegistryQueryHandler;
    let service: GetJobsRegistryService;
    let repository: MockJobRegistryRepository;
    let mapper: JobRegistryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetJobsRegistryQueryHandler,
                {
                    provide : IJobRegistryRepository,
                    useClass: MockJobRegistryRepository,
                },
                {
                    provide : GetJobsRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<GetJobsRegistryQueryHandler>(GetJobsRegistryQueryHandler);
        service = module.get<GetJobsRegistryService>(GetJobsRegistryService);
        repository = <MockJobRegistryRepository>module.get<IJobRegistryRepository>(IJobRegistryRepository);
        mapper = new JobRegistryMapper();
    });

    describe('main', () =>
    {
        test('GetJobsRegistryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobsRegistry founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetJobsRegistryQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});