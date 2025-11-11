import {
    OAuthIScopeRepository,
    OAuthMockScopeRepository,
} from '@app/o-auth/scope';
import { OAuthFindScopeService } from '@app/o-auth/scope/application/find/o-auth-find-scope.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindScopeService', () => {
    let service: OAuthFindScopeService;
    let repository: OAuthIScopeRepository;
    let mockRepository: OAuthMockScopeRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthFindScopeService,
                OAuthMockScopeRepository,
                {
                    provide: OAuthIScopeRepository,
                    useValue: {
                        find: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthFindScopeService);
        repository = module.get(OAuthIScopeRepository);
        mockRepository = module.get(OAuthMockScopeRepository);
    });

    describe('main', () => {
        test('OAuthFindScopeService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find scope', async () => {
            jest.spyOn(repository, 'find').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource[0],
            );
        });
    });
});
