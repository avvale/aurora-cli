/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthIAccessTokenRepository,
    OAuthMockAccessTokenRepository,
} from '@app/o-auth/access-token';
import { OAuthDeleteAccessTokensService } from '@app/o-auth/access-token/application/delete/o-auth-delete-access-tokens.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteAccessTokensService', () => {
    let service: OAuthDeleteAccessTokensService;
    let repository: OAuthIAccessTokenRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthDeleteAccessTokensService,
                OAuthMockAccessTokenRepository,
                {
                    provide: OAuthIAccessTokenRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthDeleteAccessTokensService);
        repository = module.get(OAuthIAccessTokenRepository);
    });

    describe('main', () => {
        test('OAuthDeleteAccessTokensService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete accessToken and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});
