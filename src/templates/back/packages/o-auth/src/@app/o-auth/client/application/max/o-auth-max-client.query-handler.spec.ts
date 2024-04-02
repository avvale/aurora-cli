import { OAuthIClientRepository, OAuthMaxClientQuery, OAuthMockClientRepository } from '@app/o-auth/client';
import { OAuthMaxClientQueryHandler } from '@app/o-auth/client/application/max/o-auth-max-client.query-handler';
import { OAuthMaxClientService } from '@app/o-auth/client/application/max/o-auth-max-client.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMaxClientQueryHandler', () =>
{
    let queryHandler: OAuthMaxClientQueryHandler;
    let service: OAuthMaxClientService;
    let repository: OAuthMockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMaxClientQueryHandler,
                {
                    provide : OAuthIClientRepository,
                    useClass: OAuthMockClientRepository,
                },
                {
                    provide : OAuthMaxClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMaxClientQueryHandler>(OAuthMaxClientQueryHandler);
        service = module.get<OAuthMaxClientService>(OAuthMaxClientService);
        repository = <OAuthMockClientRepository>module.get<OAuthIClientRepository>(OAuthIClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthMaxClientQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new OAuthMaxClientQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
