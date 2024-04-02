import { OAuthCountClientQuery, OAuthIClientRepository, OAuthMockClientRepository } from '@app/o-auth/client';
import { OAuthCountClientQueryHandler } from '@app/o-auth/client/application/count/o-auth-count-client.query-handler';
import { OAuthCountClientService } from '@app/o-auth/client/application/count/o-auth-count-client.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCountClientQueryHandler', () =>
{
    let queryHandler: OAuthCountClientQueryHandler;
    let service: OAuthCountClientService;
    let repository: OAuthMockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCountClientQueryHandler,
                {
                    provide : OAuthIClientRepository,
                    useClass: OAuthMockClientRepository,
                },
                {
                    provide : OAuthCountClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthCountClientQueryHandler>(OAuthCountClientQueryHandler);
        service = module.get<OAuthCountClientService>(OAuthCountClientService);
        repository = <OAuthMockClientRepository>module.get<OAuthIClientRepository>(OAuthIClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthCountClientQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should count total inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource.length)));
            expect(await queryHandler.execute(
                new OAuthCountClientQuery(),
            )).toStrictEqual(repository.collectionSource.length);
        });
    });
});
