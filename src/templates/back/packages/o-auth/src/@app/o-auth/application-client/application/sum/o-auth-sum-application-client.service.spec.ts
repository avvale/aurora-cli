import { OAuthIApplicationClientRepository, OAuthMockApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthSumApplicationClientService } from '@app/o-auth/application-client/application/sum/o-auth-sum-application-client.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthSumApplicationClientService', () =>
{
    let service: OAuthSumApplicationClientService;
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
                OAuthSumApplicationClientService,
                OAuthMockApplicationClientRepository,
                {
                    provide : OAuthIApplicationClientRepository,
                    useValue: {
                        sum: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthSumApplicationClientService);
        repository = module.get(OAuthIApplicationClientRepository);
        mockRepository = module.get(OAuthMockApplicationClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthSumApplicationClientService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should sum inboxes', async () =>
        {
            jest.spyOn(repository, 'sum').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.sum(column))));
            expect(await service.main('id')).toBe(mockRepository.sum('id'));
        });
    });
});
