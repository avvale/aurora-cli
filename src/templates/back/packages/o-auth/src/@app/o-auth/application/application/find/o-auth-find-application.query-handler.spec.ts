import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindApplicationQueryHandler } from './o-auth-find-application.query-handler';
import { OAuthMockApplicationRepository } from '@app/o-auth/application/infrastructure/mock/o-auth-mock-application.repository';
import { OAuthIApplicationRepository } from '@app/o-auth/application/domain/o-auth-application.repository';
import { OAuthApplicationMapper } from '@app/o-auth/application/domain/o-auth-application.mapper';
import { OAuthFindApplicationQuery } from './o-auth-find-application.query';
import { OAuthFindApplicationService } from './o-auth-find-application.service';

describe('OAuthFindApplicationQueryHandler', () =>
{
    let queryHandler: OAuthFindApplicationQueryHandler;
    let service: OAuthFindApplicationService;
    let repository: OAuthMockApplicationRepository;
    let mapper: OAuthApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindApplicationQueryHandler,
                {
                    provide : OAuthIApplicationRepository,
                    useClass: OAuthMockApplicationRepository,
                },
                {
                    provide : OAuthFindApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthFindApplicationQueryHandler>(OAuthFindApplicationQueryHandler);
        service = module.get<OAuthFindApplicationService>(OAuthFindApplicationService);
        repository = <OAuthMockApplicationRepository>module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository);
        mapper = new OAuthApplicationMapper();
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an application founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new OAuthFindApplicationQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
