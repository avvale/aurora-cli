import { OAuthIApplicationClientRepository, OAuthMinApplicationClientQuery, OAuthMockApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthMinApplicationClientQueryHandler } from '@app/o-auth/application-client/application/min/o-auth-min-application-client.query-handler';
import { OAuthMinApplicationClientService } from '@app/o-auth/application-client/application/min/o-auth-min-application-client.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMinApplicationClientQueryHandler', () =>
{
    let queryHandler: OAuthMinApplicationClientQueryHandler;
    let service: OAuthMinApplicationClientService;
    let repository: OAuthMockApplicationClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMinApplicationClientQueryHandler,
                {
                    provide : OAuthIApplicationClientRepository,
                    useClass: OAuthMockApplicationClientRepository,
                },
                {
                    provide : OAuthMinApplicationClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMinApplicationClientQueryHandler>(OAuthMinApplicationClientQueryHandler);
        service = module.get<OAuthMinApplicationClientService>(OAuthMinApplicationClientService);
        repository = <OAuthMockApplicationClientRepository>module.get<OAuthIApplicationClientRepository>(OAuthIApplicationClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthMinApplicationClientQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new OAuthMinApplicationClientQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
