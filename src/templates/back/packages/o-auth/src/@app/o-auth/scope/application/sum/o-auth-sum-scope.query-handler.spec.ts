import { OAuthIScopeRepository, OAuthMockScopeRepository, OAuthSumScopeQuery } from '@app/o-auth/scope';
import { OAuthSumScopeQueryHandler } from '@app/o-auth/scope/application/sum/o-auth-sum-scope.query-handler';
import { OAuthSumScopeService } from '@app/o-auth/scope/application/sum/o-auth-sum-scope.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthSumScopeQueryHandler', () =>
{
    let queryHandler: OAuthSumScopeQueryHandler;
    let service: OAuthSumScopeService;
    let repository: OAuthMockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthSumScopeQueryHandler,
                {
                    provide : OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide : OAuthSumScopeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthSumScopeQueryHandler>(OAuthSumScopeQueryHandler);
        service = module.get<OAuthSumScopeService>(OAuthSumScopeService);
        repository = <OAuthMockScopeRepository>module.get<OAuthIScopeRepository>(OAuthIScopeRepository);
    });

    describe('main', () =>
    {
        test('OAuthSumScopeQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new OAuthSumScopeQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
