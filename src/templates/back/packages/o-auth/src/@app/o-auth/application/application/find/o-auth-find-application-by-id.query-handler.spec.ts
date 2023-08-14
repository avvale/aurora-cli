import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindApplicationByIdQueryHandler } from './o-auth-find-application-by-id.query-handler';
import { OAuthMockApplicationRepository } from '@app/o-auth/application/infrastructure/mock/o-auth-mock-application.repository';
import { oAuthMockApplicationData } from '@app/o-auth/application/infrastructure/mock/o-auth-mock-application.data';
import { OAuthIApplicationRepository } from '@app/o-auth/application/domain/o-auth-application.repository';
import { OAuthApplicationMapper } from '@app/o-auth/application/domain/o-auth-application.mapper';
import { OAuthFindApplicationByIdQuery } from './o-auth-find-application-by-id.query';
import { OAuthFindApplicationByIdService } from './o-auth-find-application-by-id.service';

describe('OAuthFindApplicationByIdQueryHandler', () =>
{
    let queryHandler: OAuthFindApplicationByIdQueryHandler;
    let service: OAuthFindApplicationByIdService;
    let repository: OAuthMockApplicationRepository;
    let mapper: OAuthApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthFindApplicationByIdQueryHandler,
                {
                    provide : OAuthIApplicationRepository,
                    useClass: OAuthMockApplicationRepository,
                },
                {
                    provide : OAuthFindApplicationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthFindApplicationByIdQueryHandler>(OAuthFindApplicationByIdQueryHandler);
        service = module.get<OAuthFindApplicationByIdService>(OAuthFindApplicationByIdService);
        repository = <OAuthMockApplicationRepository>module.get<OAuthIApplicationRepository>(OAuthIApplicationRepository);
        mapper = new OAuthApplicationMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an application founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new OAuthFindApplicationByIdQuery(
                    oAuthMockApplicationData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
