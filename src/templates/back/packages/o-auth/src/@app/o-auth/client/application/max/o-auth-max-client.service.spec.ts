import { OAuthIClientRepository, OAuthMockClientRepository } from '@app/o-auth/client';
import { OAuthMaxClientService } from '@app/o-auth/client/application/max/o-auth-max-client.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMaxClientService', () =>
{
    let service: OAuthMaxClientService;
    let repository: OAuthIClientRepository;
    let mockRepository: OAuthMockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthMaxClientService,
                OAuthMockClientRepository,
                {
                    provide : OAuthIClientRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthMaxClientService);
        repository = module.get(OAuthIClientRepository);
        mockRepository = module.get(OAuthMockClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthMaxClientService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(repository, 'max').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.max(column))));
            expect(await service.main('id')).toBe(mockRepository.max('id'));
        });
    });
});
