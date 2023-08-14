import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthRawSQLAccessTokensService } from './o-auth-raw-sql-access-tokens.service';
import { OAuthIAccessTokenRepository } from '../../domain/o-auth-access-token.repository';
import { OAuthMockAccessTokenRepository } from '../../infrastructure/mock/o-auth-mock-access-token.repository';

describe('OAuthRawSQLAccessTokensService ', () =>
{
    let service: OAuthRawSQLAccessTokensService ;
    let repository: OAuthIAccessTokenRepository;
    let mockRepository: OAuthMockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthRawSQLAccessTokensService ,
                OAuthMockAccessTokenRepository,
                {
                    provide : OAuthIAccessTokenRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(OAuthRawSQLAccessTokensService );
        repository      = module.get(OAuthIAccessTokenRepository);
        mockRepository  = module.get(OAuthMockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('RawSQLAccessTokensService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get accessTokens', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
