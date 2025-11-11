import {
    OAuthGetScopesQuery,
    OAuthIScopeRepository,
    OAuthMockScopeRepository,
    OAuthScopeMapper,
} from '@app/o-auth/scope';
import { OAuthGetScopesQueryHandler } from '@app/o-auth/scope/application/get/o-auth-get-scopes.query-handler';
import { OAuthGetScopesService } from '@app/o-auth/scope/application/get/o-auth-get-scopes.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetScopesQueryHandler', () => {
    let queryHandler: OAuthGetScopesQueryHandler;
    let service: OAuthGetScopesService;
    let repository: OAuthMockScopeRepository;
    let mapper: OAuthScopeMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthGetScopesQueryHandler,
                {
                    provide: OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide: OAuthGetScopesService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<OAuthGetScopesQueryHandler>(
            OAuthGetScopesQueryHandler,
        );
        service = module.get<OAuthGetScopesService>(OAuthGetScopesService);
        repository = <OAuthMockScopeRepository>(
            module.get<OAuthIScopeRepository>(OAuthIScopeRepository)
        );
        mapper = new OAuthScopeMapper();
    });

    describe('main', () => {
        test('OAuthGetScopesQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scopes founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource),
                    ),
            );
            expect(
                await queryHandler.execute(new OAuthGetScopesQuery()),
            ).toStrictEqual(
                mapper.mapAggregatesToResponses(repository.collectionSource),
            );
        });
    });
});
