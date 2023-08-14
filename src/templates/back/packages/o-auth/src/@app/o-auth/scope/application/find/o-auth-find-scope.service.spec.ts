import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthFindScopeService } from './o-auth-find-scope.service';
import { OAuthIScopeRepository } from '../../domain/o-auth-scope.repository';
import { OAuthMockScopeRepository } from '../../infrastructure/mock/o-auth-mock-scope.repository';

describe('OAuthFindScopeService', () =>
{
    let service: OAuthFindScopeService;
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
                OAuthFindScopeService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthFindScopeService);
        repository = module.get(OAuthIScopeRepository);
        mockRepository = module.get(OAuthMockScopeRepository);
    });

    describe('main', () =>
    {
        test('OAuthFindScopeService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find scope', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
