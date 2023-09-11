import { OAuthIScopeRepository, oAuthMockScopeData, OAuthMockScopeRepository } from '@app/o-auth/scope';
import { OAuthFindScopeByIdService } from '@app/o-auth/scope/application/find/o-auth-find-scope-by-id.service';
import { OAuthScopeId } from '@app/o-auth/scope/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

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
