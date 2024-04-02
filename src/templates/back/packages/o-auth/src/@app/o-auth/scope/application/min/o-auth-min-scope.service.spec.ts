import { OAuthIScopeRepository, OAuthMockScopeRepository } from '@app/o-auth/scope';
import { OAuthMinScopeService } from '@app/o-auth/scope/application/min/o-auth-min-scope.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMinScopeService', () =>
{
    let service: OAuthMinScopeService;
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
                OAuthMinScopeService,
                OAuthMockScopeRepository,
                {
                    provide : OAuthIScopeRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthMinScopeService);
        repository = module.get(OAuthIScopeRepository);
        mockRepository = module.get(OAuthMockScopeRepository);
    });

    describe('main', () =>
    {
        test('OAuthMinScopeService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should min inboxes', async () =>
        {
            jest.spyOn(repository, 'min').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.min(column))));
            expect(await service.main('id')).toBe(mockRepository.min('id'));
        });
    });
});
