import { OAuthCountScopeQuery, OAuthIScopeRepository, OAuthMockScopeRepository } from '@app/o-auth/scope';
import { OAuthCountScopeQueryHandler } from '@app/o-auth/scope/application/count/o-auth-count-scope.query-handler';
import { OAuthCountScopeService } from '@app/o-auth/scope/application/count/o-auth-count-scope.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCountScopeQueryHandler', () =>
{
    let queryHandler: OAuthCountScopeQueryHandler;
    let service: OAuthCountScopeService;
    let repository: OAuthMockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCountScopeQueryHandler,
                {
                    provide : OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide : OAuthCountScopeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthCountScopeQueryHandler>(OAuthCountScopeQueryHandler);
        service = module.get<OAuthCountScopeService>(OAuthCountScopeService);
        repository = <OAuthMockScopeRepository>module.get<OAuthIScopeRepository>(OAuthIScopeRepository);
    });

    describe('main', () =>
    {
        test('OAuthCountScopeQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new OAuthCountScopeQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
