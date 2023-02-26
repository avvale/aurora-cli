import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { MockAccessTokenRepository } from '@app/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { IAccessTokenRepository } from '@app/o-auth/access-token/domain/access-token.repository';
import { AccessTokenMapper } from '@app/o-auth/access-token/domain/access-token.mapper';
import { RawSQLAccessTokensQueryHandler } from './raw-sql-access-tokens.query-handler';
import { RawSQLAccessTokensQuery } from './raw-sql-access-tokens.query';
import { RawSQLAccessTokensService } from './raw-sql-access-tokens.service';

describe('RawSQLAccessTokensQueryHandler', () =>
{
    let queryHandler: RawSQLAccessTokensQueryHandler;
    let service: RawSQLAccessTokensService;
    let repository: MockAccessTokenRepository;
    let mapper: AccessTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RawSQLAccessTokensQueryHandler,
                {
                    provide : IAccessTokenRepository,
                    useClass: MockAccessTokenRepository,
                },
                {
                    provide : RawSQLAccessTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<RawSQLAccessTokensQueryHandler>(RawSQLAccessTokensQueryHandler);
        service         = module.get<RawSQLAccessTokensService>(RawSQLAccessTokensService);
        repository      = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);
        mapper          = new AccessTokenMapper();
    });

    describe('main', () =>
    {
        test('RawSQLAccessTokensQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accessTokens founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new RawSQLAccessTokensQuery(),
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});