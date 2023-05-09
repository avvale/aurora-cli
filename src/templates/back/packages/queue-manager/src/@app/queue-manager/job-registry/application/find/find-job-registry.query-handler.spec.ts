import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindJobRegistryQueryHandler } from './find-job-registry.query-handler';
import { MockJobRegistryRepository } from '@app/queue-manager/job-registry/infrastructure/mock/mock-job-registry.repository';
import { IJobRegistryRepository } from '@app/queue-manager/job-registry/domain/job-registry.repository';
import { JobRegistryMapper } from '@app/queue-manager/job-registry/domain/job-registry.mapper';
import { FindJobRegistryQuery } from './find-job-registry.query';
import { FindJobRegistryService } from './find-job-registry.service';

describe('FindJobRegistryQueryHandler', () =>
{
    let queryHandler: FindJobRegistryQueryHandler;
    let service: FindJobRegistryService;
    let repository: MockJobRegistryRepository;
    let mapper: JobRegistryMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindJobRegistryQueryHandler,
                {
                    provide : IJobRegistryRepository,
                    useClass: MockJobRegistryRepository,
                },
                {
                    provide : FindJobRegistryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<FindJobRegistryQueryHandler>(FindJobRegistryQueryHandler);
        service = module.get<FindJobRegistryService>(FindJobRegistryService);
        repository = <MockJobRegistryRepository>module.get<IJobRegistryRepository>(IJobRegistryRepository);
        mapper = new JobRegistryMapper();
    });

    describe('main', () =>
    {
        test('FindJobRegistryQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an jobRegistry founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindJobRegistryQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});