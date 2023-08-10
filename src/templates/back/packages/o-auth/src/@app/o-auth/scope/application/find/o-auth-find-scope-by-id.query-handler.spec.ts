import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindScopeByIdQueryHandler } from './o-auth-find-scope-by-id.query-handler';
import { OAuthMockScopeRepository } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.repository';
import { oAuthMockScopeData } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.data';
import { OAuthIScopeRepository } from '@app/o-auth/scope/domain/o-auth-scope.repository';
import { OAuthScopeMapper } from '@app/o-auth/scope/domain/o-auth-scope.mapper';
import { OAuthFindScopeByIdQuery } from './o-auth-find-scope-by-id.query';
import { OAuthFindScopeByIdService } from './o-auth-find-scope-by-id.service';

describe('OAuthFindScopeByIdQueryHandler', () =>
{
    let queryHandler: OAuthFindScopeByIdQueryHandler;
    let service: OAuthFindScopeByIdService;
    let repository: OAuthMockScopeRepository;
    let mapper: OAuthScopeMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindScopeByIdQueryHandler,
                {
                    provide : OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide : OAuthFindScopeByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthFindScopeByIdQueryHandler>(OAuthFindScopeByIdQueryHandler);
        service = module.get<OAuthFindScopeByIdService>(OAuthFindScopeByIdService);
        repository = <OAuthMockScopeRepository>module.get<OAuthIScopeRepository>(OAuthIScopeRepository);
        mapper = new OAuthScopeMapper();
    });

    describe('main', () =>
    {
        test('FindScopeByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scope founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new OAuthFindScopeByIdQuery(
                    oAuthMockScopeData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
