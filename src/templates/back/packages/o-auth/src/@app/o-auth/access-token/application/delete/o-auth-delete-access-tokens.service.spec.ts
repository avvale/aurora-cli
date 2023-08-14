/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthDeleteAccessTokensService } from './o-auth-delete-access-tokens.service';
import { OAuthIAccessTokenRepository } from '../../domain/o-auth-access-token.repository';
import { OAuthMockAccessTokenRepository } from '../../infrastructure/mock/o-auth-mock-access-token.repository';

describe('OAuthDeleteAccessTokensService', () =>
{
    let service: OAuthDeleteAccessTokensService;
    let repository: OAuthIAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthDeleteAccessTokensService,
                OAuthMockAccessTokenRepository,
                {
                    provide : OAuthIAccessTokenRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthDeleteAccessTokensService);
        repository = module.get(OAuthIAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('OAuthDeleteAccessTokensService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete accessToken and emit event', async () =>
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
