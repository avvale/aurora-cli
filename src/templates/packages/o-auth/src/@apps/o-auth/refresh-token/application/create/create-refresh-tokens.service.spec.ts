/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateRefreshTokensService } from './create-refresh-tokens.service';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';
import { MockRefreshTokenRepository } from '../../infrastructure/mock/mock-refresh-token.repository';

describe('CreateRefreshTokensService', () =>
{
    let service: CreateRefreshTokensService;
    let repository: IRefreshTokenRepository;
    let mockRepository: MockRefreshTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateRefreshTokensService,
                MockRefreshTokenRepository,
                {
                    provide : IRefreshTokenRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ]
        }).compile();

        service         = module.get(CreateRefreshTokensService);
        repository      = module.get(IRefreshTokenRepository);
        mockRepository  = module.get(MockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('CreateRefreshTokensService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create refreshTokens and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource,
            )).toBe(undefined);
        });
    });
});