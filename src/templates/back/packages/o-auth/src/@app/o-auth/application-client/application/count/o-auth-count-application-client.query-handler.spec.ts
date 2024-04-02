import { OAuthCountApplicationClientQuery, OAuthIApplicationClientRepository, OAuthMockApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthCountApplicationClientQueryHandler } from '@app/o-auth/application-client/application/count/o-auth-count-application-client.query-handler';
import { OAuthCountApplicationClientService } from '@app/o-auth/application-client/application/count/o-auth-count-application-client.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCountApplicationClientQueryHandler', () =>
{
    let queryHandler: OAuthCountApplicationClientQueryHandler;
    let service: OAuthCountApplicationClientService;
    let repository: OAuthMockApplicationClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCountApplicationClientQueryHandler,
                {
                    provide : OAuthIApplicationClientRepository,
                    useClass: OAuthMockApplicationClientRepository,
                },
                {
                    provide : OAuthCountApplicationClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthCountApplicationClientQueryHandler>(OAuthCountApplicationClientQueryHandler);
        service = module.get<OAuthCountApplicationClientService>(OAuthCountApplicationClientService);
        repository = <OAuthMockApplicationClientRepository>module.get<OAuthIApplicationClientRepository>(OAuthIApplicationClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthCountApplicationClientQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new OAuthCountApplicationClientQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
