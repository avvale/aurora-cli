import { OAuthCountApplicationQuery, OAuthIApplicationRepository, OAuthMockApplicationRepository } from '@app/o-auth/application';
import { OAuthCountApplicationQueryHandler } from '@app/o-auth/application/application/count/o-auth-count-application.query-handler';
import { OAuthCountApplicationService } from '@app/o-auth/application/application/count/o-auth-count-application.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCountApplicationQueryHandler', () =>
{
    let queryHandler: OAuthCountApplicationQueryHandler;
    let service: OAuthCountApplicationService;
    let repository: OAuthMockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCountApplicationQueryHandler,
                {
                    provide : OAuthIApplicationRepository,
                    useClass: OAuthMockApplicationRepository,
                },
                {
                    provide : OAuthCountApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthCountApplicationQueryHandler>(OAuthCountApplicationQueryHandler);
        service = module.get<OAuthCountApplicationService>(OAuthCountApplicationService);
        repository = <OAuthMockApplicationRepository>module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository);
    });

    describe('main', () =>
    {
        test('OAuthCountApplicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new OAuthCountApplicationQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
