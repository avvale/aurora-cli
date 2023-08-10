import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockScopeData } from '@app/o-auth/scope/infrastructure/mock/o-auth-mock-scope.data';
import { OAuthFindScopeByIdService } from './o-auth-find-scope-by-id.service';
import { OAuthScopeId } from '../../domain/value-objects';
import { OAuthIScopeRepository } from '../../domain/o-auth-scope.repository';
import { OAuthMockScopeRepository } from '../../infrastructure/mock/o-auth-mock-scope.repository';

describe('OAuthFindScopeByIdService', () =>
{
    let service: OAuthFindScopeByIdService;
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
                OAuthFindScopeByIdService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthFindScopeByIdService);
        repository = module.get(OAuthIScopeRepository);
        mockRepository = module.get(OAuthMockScopeRepository);
    });

    describe('main', () =>
    {
        test('FindScopeByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find scope by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new OAuthScopeId(oAuthMockScopeData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
