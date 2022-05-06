import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetApplicationsQueryHandler } from './get-applications.query-handler';
import { MockApplicationRepository } from '@apps/o-auth/application/infrastructure/mock/mock-application.repository';
import { IApplicationRepository } from '@apps/o-auth/application/domain/application.repository';
import { ApplicationMapper } from '@apps/o-auth/application/domain/application.mapper';
import { GetApplicationsQuery } from './get-applications.query';
import { GetApplicationsService } from './get-applications.service';

describe('GetApplicationsQueryHandler', () =>
{
    let queryHandler: GetApplicationsQueryHandler;
    let service: GetApplicationsService;
    let repository: MockApplicationRepository;
    let mapper: ApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetApplicationsQueryHandler,
                {
                    provide : IApplicationRepository,
                    useClass: MockApplicationRepository,
                },
                {
                    provide : GetApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<GetApplicationsQueryHandler>(GetApplicationsQueryHandler);
        service         = module.get<GetApplicationsService>(GetApplicationsService);
        repository      = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);
        mapper          = new ApplicationMapper();
    });

    describe('main', () =>
    {
        test('GetApplicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applications founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetApplicationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});