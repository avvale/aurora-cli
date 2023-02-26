import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLRefreshTokensService } from './raw-sql-refresh-tokens.service';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';
import { MockRefreshTokenRepository } from '../../infrastructure/mock/mock-refresh-token.repository';

describe('RawSQLRefreshTokensService', () =>
{
    let service: RawSQLRefreshTokensService;
    let repository: IRefreshTokenRepository;
    let mockRepository: MockRefreshTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLRefreshTokensService,
                MockRefreshTokenRepository,
                {
                    provide : IRefreshTokenRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLRefreshTokensService);
        repository      = module.get(IRefreshTokenRepository);
        mockRepository  = module.get(MockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('RawSQLRefreshTokensService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get refreshTokens', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});