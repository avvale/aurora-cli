import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindAccessTokenQueryHandler } from './find-access-token.query-handler';
import { MockAccessTokenRepository } from '@app/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { IAccessTokenRepository } from '@app/o-auth/access-token/domain/access-token.repository';
import { AccessTokenMapper } from '@app/o-auth/access-token/domain/access-token.mapper';
import { FindAccessTokenQuery } from './find-access-token.query';
import { FindAccessTokenService } from './find-access-token.service';

describe('FindAccessTokenQueryHandler', () =>
{
    let queryHandler: FindAccessTokenQueryHandler;
    let service: FindAccessTokenService;
    let repository: MockAccessTokenRepository;
    let mapper: AccessTokenMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAccessTokenQueryHandler,
                {
                    provide : IAccessTokenRepository,
                    useClass: MockAccessTokenRepository,
                },
                {
                    provide : FindAccessTokenService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler    = module.get<FindAccessTokenQueryHandler>(FindAccessTokenQueryHandler);
        service         = module.get<FindAccessTokenService>(FindAccessTokenService);
        repository      = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);
        mapper          = new AccessTokenMapper();
    });

    describe('main', () =>
    {
        test('FindAccessTokenQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an accessToken founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindAccessTokenQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});