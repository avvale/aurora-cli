import { OAuthIApplicationRepository, OAuthMockApplicationRepository } from '@app/o-auth/application';
import { OAuthMinApplicationService } from '@app/o-auth/application/application/min/o-auth-min-application.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMinApplicationService', () =>
{
    let service: OAuthMinApplicationService;
    let repository: OAuthIApplicationRepository;
    let mockRepository: OAuthMockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthMinApplicationService,
                OAuthMockApplicationRepository,
                {
                    provide : OAuthIApplicationRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthMinApplicationService);
        repository = module.get(OAuthIApplicationRepository);
        mockRepository = module.get(OAuthMockApplicationRepository);
    });

    describe('main', () =>
    {
        test('OAuthMinApplicationService should be defined', () =>
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
