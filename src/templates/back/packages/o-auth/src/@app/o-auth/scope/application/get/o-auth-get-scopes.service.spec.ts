import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthGetScopesService } from './o-auth-get-scopes.service';
import { OAuthIScopeRepository } from '../../domain/o-auth-scope.repository';
import { OAuthMockScopeRepository } from '../../infrastructure/mock/o-auth-mock-scope.repository';

describe('OAuthGetScopesService', () =>
{
    let service: OAuthGetScopesService;
    let repository: OAuthIScopeRepository;
    let mockRepository: OAuthMockScopeRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthGetScopesService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthGetScopesService);
        repository = module.get(OAuthIScopeRepository);
        mockRepository = module.get(OAuthMockScopeRepository);
    });

    describe('main', () =>
    {
        test('GetScopesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get scopes', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
