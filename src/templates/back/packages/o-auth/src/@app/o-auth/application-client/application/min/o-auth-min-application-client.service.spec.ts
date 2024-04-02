import { OAuthIApplicationClientRepository, OAuthMockApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthMinApplicationClientService } from '@app/o-auth/application-client/application/min/o-auth-min-application-client.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMinApplicationClientService', () =>
{
    let service: OAuthMinApplicationClientService;
    let repository: OAuthIApplicationClientRepository;
    let mockRepository: OAuthMockApplicationClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthMinApplicationClientService,
                OAuthMockApplicationClientRepository,
                {
                    provide : OAuthIApplicationClientRepository,
                    useValue: {
                        min: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthMinApplicationClientService);
        repository = module.get(OAuthIApplicationClientRepository);
        mockRepository = module.get(OAuthMockApplicationClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthMinApplicationClientService should be defined', () =>
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
