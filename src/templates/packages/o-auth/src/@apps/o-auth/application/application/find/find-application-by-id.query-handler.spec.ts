import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindApplicationByIdQueryHandler } from './find-application-by-id.query-handler';
import { MockApplicationRepository } from '@apps/o-auth/application/infrastructure/mock/mock-application.repository';
import { applications } from '@apps/o-auth/application/infrastructure/seeds/application.seed';
import { IApplicationRepository } from '@apps/o-auth/application/domain/application.repository';
import { ApplicationMapper } from '@apps/o-auth/application/domain/application.mapper';
import { FindApplicationByIdQuery } from './find-application-by-id.query';
import { FindApplicationByIdService } from './find-application-by-id.service';

describe('FindApplicationByIdQueryHandler', () =>
{
    let queryHandler: FindApplicationByIdQueryHandler;
    let service: FindApplicationByIdService;
    let repository: MockApplicationRepository;
    let mapper: ApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindApplicationByIdQueryHandler,
                {
                    provide : IApplicationRepository,
                    useClass: MockApplicationRepository,
                },
                {
                    provide : FindApplicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindApplicationByIdQueryHandler>(FindApplicationByIdQueryHandler);
        service         = module.get<FindApplicationByIdService>(FindApplicationByIdService);
        repository      = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);
        mapper          = new ApplicationMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an application founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindApplicationByIdQuery(
                    applications[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});