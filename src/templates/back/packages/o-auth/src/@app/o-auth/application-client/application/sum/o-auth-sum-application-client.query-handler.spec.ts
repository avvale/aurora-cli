import { OAuthIApplicationClientRepository, OAuthMockApplicationClientRepository, OAuthSumApplicationClientQuery } from '@app/o-auth/application-client';
import { OAuthSumApplicationClientQueryHandler } from '@app/o-auth/application-client/application/sum/o-auth-sum-application-client.query-handler';
import { OAuthSumApplicationClientService } from '@app/o-auth/application-client/application/sum/o-auth-sum-application-client.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthSumApplicationClientQueryHandler', () =>
{
    let queryHandler: OAuthSumApplicationClientQueryHandler;
    let service: OAuthSumApplicationClientService;
    let repository: OAuthMockApplicationClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthSumApplicationClientQueryHandler,
                {
                    provide : OAuthIApplicationClientRepository,
                    useClass: OAuthMockApplicationClientRepository,
                },
                {
                    provide : OAuthSumApplicationClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthSumApplicationClientQueryHandler>(OAuthSumApplicationClientQueryHandler);
        service = module.get<OAuthSumApplicationClientService>(OAuthSumApplicationClientService);
        repository = <OAuthMockApplicationClientRepository>module.get<OAuthIApplicationClientRepository>(OAuthIApplicationClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthSumApplicationClientQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new OAuthSumApplicationClientQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
