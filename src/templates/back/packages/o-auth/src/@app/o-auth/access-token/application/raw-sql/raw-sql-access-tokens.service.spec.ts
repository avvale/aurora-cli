import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { RawSQLAccessTokensService } from './raw-sql-access-tokens.service';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { MockAccessTokenRepository } from '../../infrastructure/mock/mock-access-token.repository';

describe('RawSQLAccessTokensService', () =>
{
    let service: RawSQLAccessTokensService;
    let repository: IAccessTokenRepository;
    let mockRepository: MockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                RawSQLAccessTokensService,
                MockAccessTokenRepository,
                {
                    provide : IAccessTokenRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(RawSQLAccessTokensService);
        repository      = module.get(IAccessTokenRepository);
        mockRepository  = module.get(MockAccessTokenRepository);
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