import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindJobRegistryByIdQueryHandler } from './find-job-registry-by-id.query-handler';
import { MockJobRegistryRepository } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.repository';
import { jobsRegistry } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.data';
import { IJobRegistryRepository } from '@app/queue-manager/job-registry/domain/job-registry.repository';
import { JobRegistryMapper } from '@app/queue-manager/job-registry/domain/job-registry.mapper';
import { FindJobRegistryByIdQuery } from './find-job-registry-by-id.query';
import { FindJobRegistryByIdService } from './find-job-registry-by-id.service';

describe('FindJobRegistryByIdQueryHandler', () =>
{
    let queryHandler: FindJobRegistryByIdQueryHandler;
    let service: FindJobRegistryByIdService;
    let repository: MockJobRegistryRepository;
    let mapper: JobRegistryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindJobRegistryByIdQueryHandler,
                {
                    provide : IJobRegistryRepository,
                    useClass: MockJobRegistryRepository,
                },
                {
                    provide : FindJobRegistryByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<FindJobRegistryByIdQueryHandler>(FindJobRegistryByIdQueryHandler);
        service = module.get<FindJobRegistryByIdService>(FindJobRegistryByIdService);
        repository = <MockJobRegistryRepository>module.get<IJobRegistryRepository>(IJobRegistryRepository);
        mapper = new JobRegistryMapper();
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
                new FindJobRegistryByIdQuery(
                    jobsRegistry[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});