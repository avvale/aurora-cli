import {
    OAuthFindScopeQuery,
    OAuthIScopeRepository,
    OAuthMockScopeRepository,
    OAuthScopeMapper,
} from '@app/o-auth/scope';
import { OAuthFindScopeQueryHandler } from '@app/o-auth/scope/application/find/o-auth-find-scope.query-handler';
import { OAuthFindScopeService } from '@app/o-auth/scope/application/find/o-auth-find-scope.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindScopeQueryHandler', () => {
    let queryHandler: OAuthFindScopeQueryHandler;
    let service: OAuthFindScopeService;
    let repository: OAuthMockScopeRepository;
    let mapper: OAuthScopeMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindScopeQueryHandler,
                {
                    provide: OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide: OAuthFindScopeService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<OAuthFindScopeQueryHandler>(
            OAuthFindScopeQueryHandler,
        );
        service = module.get<OAuthFindScopeService>(OAuthFindScopeService);
        repository = <OAuthMockScopeRepository>(
            module.get<OAuthIScopeRepository>(OAuthIScopeRepository)
        );
        mapper = new OAuthScopeMapper();
    });

    describe('main', () => {
        test('OAuthFindScopeQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an scope founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(new OAuthFindScopeQuery()),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
