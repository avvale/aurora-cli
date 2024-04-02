import { OAuthIClientRepository, OAuthMinClientQuery, OAuthMockClientRepository } from '@app/o-auth/client';
import { OAuthMinClientQueryHandler } from '@app/o-auth/client/application/min/o-auth-min-client.query-handler';
import { OAuthMinClientService } from '@app/o-auth/client/application/min/o-auth-min-client.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMinClientQueryHandler', () =>
{
    let queryHandler: OAuthMinClientQueryHandler;
    let service: OAuthMinClientService;
    let repository: OAuthMockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMinClientQueryHandler,
                {
                    provide : OAuthIClientRepository,
                    useClass: OAuthMockClientRepository,
                },
                {
                    provide : OAuthMinClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMinClientQueryHandler>(OAuthMinClientQueryHandler);
        service = module.get<OAuthMinClientService>(OAuthMinClientService);
        repository = <OAuthMockClientRepository>module.get<OAuthIClientRepository>(OAuthIClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthMinClientQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.min(column))));
            expect(await queryHandler.execute(
                new OAuthMinClientQuery('id'),
            )).toStrictEqual(repository.min('id'));
        });
    });
});
