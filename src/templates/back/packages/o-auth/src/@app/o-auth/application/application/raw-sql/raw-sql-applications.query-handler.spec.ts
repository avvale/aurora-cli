import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockApplicationRepository } from '@app/o-auth/application/infrastructure/mock/mock-application.repository';
import { IApplicationRepository } from '@app/o-auth/application/domain/application.repository';
import { ApplicationMapper } from '@app/o-auth/application/domain/application.mapper';
import { RawSQLApplicationsQueryHandler } from './raw-sql-applications.query-handler';
import { RawSQLApplicationsQuery } from './raw-sql-applications.query';
import { RawSQLApplicationsService } from './raw-sql-applications.service';

describe('RawSQLApplicationsQueryHandler', () =>
{
    let queryHandler: RawSQLApplicationsQueryHandler;
    let service: RawSQLApplicationsService;
    let repository: MockApplicationRepository;
    let mapper: ApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLApplicationsQueryHandler,
                {
                    provide : IApplicationRepository,
                    useClass: MockApplicationRepository,
                },
                {
                    provide : RawSQLApplicationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLApplicationsQueryHandler>(RawSQLApplicationsQueryHandler);
        service         = module.get<RawSQLApplicationsService>(RawSQLApplicationsService);
        repository      = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);
        mapper          = new ApplicationMapper();
    });

    describe('main', () =>
    {
        test('RawSQLApplicationsQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applications founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLApplicationsQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});