import { OAuthIApplicationRepository, OAuthMockApplicationRepository, OAuthSumApplicationQuery } from '@app/o-auth/application';
import { OAuthSumApplicationQueryHandler } from '@app/o-auth/application/application/sum/o-auth-sum-application.query-handler';
import { OAuthSumApplicationService } from '@app/o-auth/application/application/sum/o-auth-sum-application.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthSumApplicationQueryHandler', () =>
{
    let queryHandler: OAuthSumApplicationQueryHandler;
    let service: OAuthSumApplicationService;
    let repository: OAuthMockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthSumApplicationQueryHandler,
                {
                    provide : OAuthIApplicationRepository,
                    useClass: OAuthMockApplicationRepository,
                },
                {
                    provide : OAuthSumApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthSumApplicationQueryHandler>(OAuthSumApplicationQueryHandler);
        service = module.get<OAuthSumApplicationService>(OAuthSumApplicationService);
        repository = <OAuthMockApplicationRepository>module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository);
    });

    describe('main', () =>
    {
        test('OAuthSumApplicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new OAuthSumApplicationQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
