import { OAuthIScopeRepository, OAuthMaxScopeQuery, OAuthMockScopeRepository } from '@app/o-auth/scope';
import { OAuthMaxScopeQueryHandler } from '@app/o-auth/scope/application/max/o-auth-max-scope.query-handler';
import { OAuthMaxScopeService } from '@app/o-auth/scope/application/max/o-auth-max-scope.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMaxScopeQueryHandler', () =>
{
    let queryHandler: OAuthMaxScopeQueryHandler;
    let service: OAuthMaxScopeService;
    let repository: OAuthMockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMaxScopeQueryHandler,
                {
                    provide : OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide : OAuthMaxScopeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMaxScopeQueryHandler>(OAuthMaxScopeQueryHandler);
        service = module.get<OAuthMaxScopeService>(OAuthMaxScopeService);
        repository = <OAuthMockScopeRepository>module.get<OAuthIScopeRepository>(OAuthIScopeRepository);
    });

    describe('main', () =>
    {
        test('OAuthMaxScopeQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new OAuthMaxScopeQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
