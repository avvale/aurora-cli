import { OAuthIApplicationClientRepository, OAuthMockApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthCountApplicationClientService } from '@app/o-auth/application-client/application/count/o-auth-count-application-client.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCountApplicationClientService', () =>
{
    let service: OAuthCountApplicationClientService;
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
                OAuthCountApplicationClientService,
                OAuthMockApplicationClientRepository,
                {
                    provide : OAuthIApplicationClientRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthCountApplicationClientService);
        repository = module.get(OAuthIApplicationClientRepository);
        mockRepository = module.get(OAuthMockApplicationClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthCountApplicationClientService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () =>
        {
            jest.spyOn(repository, 'count').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource.length)));
            expect(await service.main()).toBe(mockRepository.collectionSource.length);
        });
    });
});
