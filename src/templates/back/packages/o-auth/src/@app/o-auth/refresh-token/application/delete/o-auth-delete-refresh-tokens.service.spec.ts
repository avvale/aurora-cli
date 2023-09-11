/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthIRefreshTokenRepository, OAuthMockRefreshTokenRepository } from '@app/o-auth/refresh-token';
import { OAuthDeleteRefreshTokensService } from '@app/o-auth/refresh-token/application/delete/o-auth-delete-refresh-tokens.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteRefreshTokensService', () =>
{
    let service: OAuthDeleteRefreshTokensService;
    let repository: OAuthIRefreshTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthDeleteRefreshTokensService,
                OAuthMockRefreshTokenRepository,
                {
                    provide : OAuthIRefreshTokenRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthDeleteRefreshTokensService);
        repository = module.get(OAuthIRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthDeleteRefreshTokensService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete refreshToken and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
