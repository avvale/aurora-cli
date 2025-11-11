import {
    OAuthFindScopeByIdQuery,
    OAuthIScopeRepository,
    oAuthMockScopeData,
    OAuthMockScopeRepository,
    OAuthScopeMapper,
} from '@app/o-auth/scope';
import { OAuthFindScopeByIdQueryHandler } from '@app/o-auth/scope/application/find/o-auth-find-scope-by-id.query-handler';
import { OAuthFindScopeByIdService } from '@app/o-auth/scope/application/find/o-auth-find-scope-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindScopeByIdQueryHandler', () => {
    let queryHandler: OAuthFindScopeByIdQueryHandler;
    let service: OAuthFindScopeByIdService;
    let repository: OAuthMockScopeRepository;
    let mapper: OAuthScopeMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindScopeByIdQueryHandler,
                {
                    provide: OAuthIScopeRepository,
                    useClass: OAuthMockScopeRepository,
                },
                {
                    provide: OAuthFindScopeByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<OAuthFindScopeByIdQueryHandler>(
            OAuthFindScopeByIdQueryHandler,
        );
        service = module.get<OAuthFindScopeByIdService>(
            OAuthFindScopeByIdService,
        );
        repository = <OAuthMockScopeRepository>(
            module.get<OAuthIScopeRepository>(OAuthIScopeRepository)
        );
        mapper = new OAuthScopeMapper();
    });

    describe('main', () => {
        test('FindScopeByIdQueryHandler should be defined', () => {
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
                await queryHandler.execute(
                    new OAuthFindScopeByIdQuery(oAuthMockScopeData[0].id),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
