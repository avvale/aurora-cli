import { OAuthIApplicationClientRepository, OAuthMaxApplicationClientQuery, OAuthMockApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthMaxApplicationClientQueryHandler } from '@app/o-auth/application-client/application/max/o-auth-max-application-client.query-handler';
import { OAuthMaxApplicationClientService } from '@app/o-auth/application-client/application/max/o-auth-max-application-client.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMaxApplicationClientQueryHandler', () =>
{
    let queryHandler: OAuthMaxApplicationClientQueryHandler;
    let service: OAuthMaxApplicationClientService;
    let repository: OAuthMockApplicationClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthMaxApplicationClientQueryHandler,
                {
                    provide : OAuthIApplicationClientRepository,
                    useClass: OAuthMockApplicationClientRepository,
                },
                {
                    provide : OAuthMaxApplicationClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthMaxApplicationClientQueryHandler>(OAuthMaxApplicationClientQueryHandler);
        service = module.get<OAuthMaxApplicationClientService>(OAuthMaxApplicationClientService);
        repository = <OAuthMockApplicationClientRepository>module.get<OAuthIApplicationClientRepository>(OAuthIApplicationClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthMaxApplicationClientQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.max(column))));
            expect(await queryHandler.execute(
                new OAuthMaxApplicationClientQuery('id'),
            )).toStrictEqual(repository.max('id'));
        });
    });
});
