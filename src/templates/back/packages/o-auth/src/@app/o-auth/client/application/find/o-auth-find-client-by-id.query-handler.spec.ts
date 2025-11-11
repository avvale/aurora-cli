import {
    OAuthClientMapper,
    OAuthFindClientByIdQuery,
    OAuthIClientRepository,
    oAuthMockClientData,
    OAuthMockClientRepository,
} from '@app/o-auth/client';
import { OAuthFindClientByIdQueryHandler } from '@app/o-auth/client/application/find/o-auth-find-client-by-id.query-handler';
import { OAuthFindClientByIdService } from '@app/o-auth/client/application/find/o-auth-find-client-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindClientByIdQueryHandler', () => {
    let queryHandler: OAuthFindClientByIdQueryHandler;
    let service: OAuthFindClientByIdService;
    let repository: OAuthMockClientRepository;
    let mapper: OAuthClientMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindClientByIdQueryHandler,
                {
                    provide: OAuthIClientRepository,
                    useClass: OAuthMockClientRepository,
                },
                {
                    provide: OAuthFindClientByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<OAuthFindClientByIdQueryHandler>(
            OAuthFindClientByIdQueryHandler,
        );
        service = module.get<OAuthFindClientByIdService>(
            OAuthFindClientByIdService,
        );
        repository = <OAuthMockClientRepository>(
            module.get<OAuthIClientRepository>(OAuthIClientRepository)
        );
        mapper = new OAuthClientMapper();
    });

    describe('main', () => {
        test('FindClientByIdQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an client founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new OAuthFindClientByIdQuery(oAuthMockClientData[0].id),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
