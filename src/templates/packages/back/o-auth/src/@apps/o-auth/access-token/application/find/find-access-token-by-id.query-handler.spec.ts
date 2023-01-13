import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAccessTokenByIdQueryHandler } from './find-access-token-by-id.query-handler';
import { MockAccessTokenRepository } from '@app/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { accessTokens } from '@app/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { IAccessTokenRepository } from '@app/o-auth/access-token/domain/access-token.repository';
import { AccessTokenMapper } from '@app/o-auth/access-token/domain/access-token.mapper';
import { FindAccessTokenByIdQuery } from './find-access-token-by-id.query';
import { FindAccessTokenByIdService } from './find-access-token-by-id.service';

describe('FindAccessTokenByIdQueryHandler', () =>
{
    let queryHandler: FindAccessTokenByIdQueryHandler;
    let service: FindAccessTokenByIdService;
    let repository: MockAccessTokenRepository;
    let mapper: AccessTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAccessTokenByIdQueryHandler,
                {
                    provide : IAccessTokenRepository,
                    useClass: MockAccessTokenRepository,
                },
                {
                    provide : FindAccessTokenByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindAccessTokenByIdQueryHandler>(FindAccessTokenByIdQueryHandler);
        service         = module.get<FindAccessTokenByIdService>(FindAccessTokenByIdService);
        repository      = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);
        mapper          = new AccessTokenMapper();
    });

    describe('main', () =>
    {
        test('FindAccessTokenByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accessToken founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAccessTokenByIdQuery(
                    accessTokens[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});