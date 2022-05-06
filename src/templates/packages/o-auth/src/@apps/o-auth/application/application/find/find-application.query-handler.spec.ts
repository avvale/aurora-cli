import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindApplicationQueryHandler } from './find-application.query-handler';
import { MockApplicationRepository } from '@apps/o-auth/application/infrastructure/mock/mock-application.repository';
import { IApplicationRepository } from '@apps/o-auth/application/domain/application.repository';
import { ApplicationMapper } from '@apps/o-auth/application/domain/application.mapper';
import { FindApplicationQuery } from './find-application.query';
import { FindApplicationService } from './find-application.service';

describe('FindApplicationQueryHandler', () =>
{
    let queryHandler: FindApplicationQueryHandler;
    let service: FindApplicationService;
    let repository: MockApplicationRepository;
    let mapper: ApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindApplicationQueryHandler,
                {
                    provide : IApplicationRepository,
                    useClass: MockApplicationRepository,
                },
                {
                    provide : FindApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindApplicationQueryHandler>(FindApplicationQueryHandler);
        service         = module.get<FindApplicationService>(FindApplicationService);
        repository      = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);
        mapper          = new ApplicationMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an application founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindApplicationQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});