import { OAuthIApplicationRepository, OAuthMinApplicationQuery, OAuthMockApplicationRepository } from '@app/o-auth/application';
import { OAuthMinApplicationQueryHandler } from '@app/o-auth/application/application/min/o-auth-min-application.query-handler';
import { OAuthMinApplicationService } from '@app/o-auth/application/application/min/o-auth-min-application.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMinApplicationQueryHandler', () =>
{
    let queryHandler: OAuthMinApplicationQueryHandler;
    let service: OAuthMinApplicationService;
    let repository: OAuthMockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMinApplicationQueryHandler,
                {
                    provide : OAuthIApplicationRepository,
                    useClass: OAuthMockApplicationRepository,
                },
                {
                    provide : OAuthMinApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMinApplicationQueryHandler>(OAuthMinApplicationQueryHandler);
        service = module.get<OAuthMinApplicationService>(OAuthMinApplicationService);
        repository = <OAuthMockApplicationRepository>module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository);
    });

    describe('main', () =>
    {
        test('OAuthMinApplicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new OAuthMinApplicationQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
