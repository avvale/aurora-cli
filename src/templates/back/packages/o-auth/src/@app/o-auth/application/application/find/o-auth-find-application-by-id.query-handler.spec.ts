import {
    OAuthApplicationMapper,
    OAuthFindApplicationByIdQuery,
    OAuthIApplicationRepository,
    oAuthMockApplicationData,
    OAuthMockApplicationRepository,
} from '@app/o-auth/application';
import { OAuthFindApplicationByIdQueryHandler } from '@app/o-auth/application/application/find/o-auth-find-application-by-id.query-handler';
import { OAuthFindApplicationByIdService } from '@app/o-auth/application/application/find/o-auth-find-application-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationByIdQueryHandler', () => {
    let queryHandler: OAuthFindApplicationByIdQueryHandler;
    let service: OAuthFindApplicationByIdService;
    let repository: OAuthMockApplicationRepository;
    let mapper: OAuthApplicationMapper;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindApplicationByIdQueryHandler,
                {
                    provide: OAuthIApplicationRepository,
                    useClass: OAuthMockApplicationRepository,
                },
                {
                    provide: OAuthFindApplicationByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        queryHandler = module.get<OAuthFindApplicationByIdQueryHandler>(
            OAuthFindApplicationByIdQueryHandler,
        );
        service = module.get<OAuthFindApplicationByIdService>(
            OAuthFindApplicationByIdService,
        );
        repository = <OAuthMockApplicationRepository>(
            module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository)
        );
        mapper = new OAuthApplicationMapper();
    });

    describe('main', () => {
        test('FindApplicationByIdQueryHandler should be defined', () => {
            expect(queryHandler).toBeDefined();
        });

        test('should return an application founded', async () => {
            jest.spyOn(service, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(repository.collectionSource[0]),
                    ),
            );
            expect(
                await queryHandler.execute(
                    new OAuthFindApplicationByIdQuery(
                        oAuthMockApplicationData[0].id,
                    ),
                ),
            ).toStrictEqual(
                mapper.mapAggregateToResponse(repository.collectionSource[0]),
            );
        });
    });
});
