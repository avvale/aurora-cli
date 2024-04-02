import { OAuthIApplicationRepository, OAuthMaxApplicationQuery, OAuthMockApplicationRepository } from '@app/o-auth/application';
import { OAuthMaxApplicationQueryHandler } from '@app/o-auth/application/application/max/o-auth-max-application.query-handler';
import { OAuthMaxApplicationService } from '@app/o-auth/application/application/max/o-auth-max-application.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMaxApplicationQueryHandler', () =>
{
    let queryHandler: OAuthMaxApplicationQueryHandler;
    let service: OAuthMaxApplicationService;
    let repository: OAuthMockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMaxApplicationQueryHandler,
                {
                    provide : OAuthIApplicationRepository,
                    useClass: OAuthMockApplicationRepository,
                },
                {
                    provide : OAuthMaxApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMaxApplicationQueryHandler>(OAuthMaxApplicationQueryHandler);
        service = module.get<OAuthMaxApplicationService>(OAuthMaxApplicationService);
        repository = <OAuthMockApplicationRepository>module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository);
    });

    describe('main', () =>
    {
        test('OAuthMaxApplicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new OAuthMaxApplicationQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
