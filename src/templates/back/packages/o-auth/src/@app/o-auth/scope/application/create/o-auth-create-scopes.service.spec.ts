/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthCreateScopesService } from './o-auth-create-scopes.service';
import { OAuthIScopeRepository } from '../../domain/o-auth-scope.repository';
import { OAuthMockScopeRepository } from '../../infrastructure/mock/o-auth-mock-scope.repository';

describe('OAuthCreateScopesService', () =>
{
    let service: OAuthCreateScopesService;
    let mockRepository: OAuthMockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthCreateScopesService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthCreateScopesService);
        mockRepository = module.get(OAuthMockScopeRepository);
    });

    describe('main', () =>
    {
        test('CreateScopesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create scopes and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
