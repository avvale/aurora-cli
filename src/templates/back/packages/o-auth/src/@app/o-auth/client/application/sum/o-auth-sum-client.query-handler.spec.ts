import { OAuthIClientRepository, OAuthMockClientRepository, OAuthSumClientQuery } from '@app/o-auth/client';
import { OAuthSumClientQueryHandler } from '@app/o-auth/client/application/sum/o-auth-sum-client.query-handler';
import { OAuthSumClientService } from '@app/o-auth/client/application/sum/o-auth-sum-client.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthSumClientQueryHandler', () =>
{
    let queryHandler: OAuthSumClientQueryHandler;
    let service: OAuthSumClientService;
    let repository: OAuthMockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthSumClientQueryHandler,
                {
                    provide : OAuthIClientRepository,
                    useClass: OAuthMockClientRepository,
                },
                {
                    provide : OAuthSumClientService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<OAuthSumClientQueryHandler>(OAuthSumClientQueryHandler);
        service = module.get<OAuthSumClientService>(OAuthSumClientService);
        repository = <OAuthMockClientRepository>module.get<OAuthIClientRepository>(OAuthIClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthSumClientQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation((column: string) => new Promise(resolve => resolve(repository.sum(column))));
            expect(await queryHandler.execute(
                new OAuthSumClientQuery('id'),
            )).toStrictEqual(repository.sum('id'));
        });
    });
});
