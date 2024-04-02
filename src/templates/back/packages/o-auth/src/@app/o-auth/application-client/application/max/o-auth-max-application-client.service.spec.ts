import { OAuthIApplicationClientRepository, OAuthMockApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthMaxApplicationClientService } from '@app/o-auth/application-client/application/max/o-auth-max-application-client.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthMaxApplicationClientService', () =>
{
    let service: OAuthMaxApplicationClientService;
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
                OAuthMaxApplicationClientService,
                OAuthMockApplicationClientRepository,
                {
                    provide : OAuthIApplicationClientRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthMaxApplicationClientService);
        repository = module.get(OAuthIApplicationClientRepository);
        mockRepository = module.get(OAuthMockApplicationClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthMaxApplicationClientService should be defined', () =>
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
