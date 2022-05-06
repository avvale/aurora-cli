import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetAccessTokensQueryHandler } from './get-access-tokens.query-handler';
import { MockAccessTokenRepository } from '@apps/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { IAccessTokenRepository } from '@apps/o-auth/access-token/domain/access-token.repository';
import { AccessTokenMapper } from '@apps/o-auth/access-token/domain/access-token.mapper';
import { GetAccessTokensQuery } from './get-access-tokens.query';
import { GetAccessTokensService } from './get-access-tokens.service';

describe('GetAccessTokensQueryHandler', () =>
{
    let queryHandler: GetAccessTokensQueryHandler;
    let service: GetAccessTokensService;
    let repository: MockAccessTokenRepository;
    let mapper: AccessTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetAccessTokensQueryHandler,
                {
                    provide : IAccessTokenRepository,
                    useClass: MockAccessTokenRepository,
                },
                {
                    provide : GetAccessTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<GetAccessTokensQueryHandler>(GetAccessTokensQueryHandler);
        service         = module.get<GetAccessTokensService>(GetAccessTokensService);
        repository      = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);
        mapper          = new AccessTokenMapper();
    });

    describe('main', () =>
    {
        test('GetAccessTokensQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accessTokens founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetAccessTokensQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});