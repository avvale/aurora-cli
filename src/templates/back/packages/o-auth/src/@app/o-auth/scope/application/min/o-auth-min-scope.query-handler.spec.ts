import { OAuthIScopeRepository, OAuthMinScopeQuery, OAuthMockScopeRepository } from '@app/o-auth/scope';
import { OAuthMinScopeQueryHandler } from '@app/o-auth/scope/application/min/o-auth-min-scope.query-handler';
import { OAuthMinScopeService } from '@app/o-auth/scope/application/min/o-auth-min-scope.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMinScopeQueryHandler', () =>
{
    let queryHandler: OAuthMinScopeQueryHandler;
    let service: OAuthMinScopeService;
    let repository: OAuthMockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMinScopeQueryHandler,
                {
                    provide : OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide : OAuthMinScopeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMinScopeQueryHandler>(OAuthMinScopeQueryHandler);
        service = module.get<OAuthMinScopeService>(OAuthMinScopeService);
        repository = <OAuthMockScopeRepository>module.get<OAuthIScopeRepository>(OAuthIScopeRepository);
    });

    describe('main', () =>
    {
        test('OAuthMinScopeQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new OAuthMinScopeQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
