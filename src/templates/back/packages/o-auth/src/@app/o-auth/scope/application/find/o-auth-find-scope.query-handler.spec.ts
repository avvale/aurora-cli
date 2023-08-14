import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindScopeQueryHandler } from './o-auth-find-scope.query-handler';
import { OAuthMockScopeRepository } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.repository';
import { OAuthIScopeRepository } from '@app/o-auth/scope/domain/o-auth-scope.repository';
import { OAuthScopeMapper } from '@app/o-auth/scope/domain/o-auth-scope.mapper';
import { OAuthFindScopeQuery } from './o-auth-find-scope.query';
import { OAuthFindScopeService } from './o-auth-find-scope.service';

describe('OAuthFindScopeQueryHandler', () =>
{
    let queryHandler: OAuthFindScopeQueryHandler;
    let service: OAuthFindScopeService;
    let repository: OAuthMockScopeRepository;
    let mapper: OAuthScopeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindScopeQueryHandler,
                {
                    provide : OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide : OAuthFindScopeService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthFindScopeQueryHandler>(OAuthFindScopeQueryHandler);
        service = module.get<OAuthFindScopeService>(OAuthFindScopeService);
        repository = <OAuthMockScopeRepository>module.get<OAuthIScopeRepository>(OAuthIScopeRepository);
        mapper = new OAuthScopeMapper();
    });

    describe('main', () =>
    {
        test('OAuthFindScopeQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scope founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new OAuthFindScopeQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
