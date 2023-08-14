import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthFindClientService } from './o-auth-find-client.service';
import { OAuthIClientRepository } from '../../domain/o-auth-client.repository';
import { OAuthMockClientRepository } from '../../infrastructure/mock/o-auth-mock-client.repository';

describe('OAuthFindClientService', () =>
{
    let service: OAuthFindClientService;
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
                OAuthFindClientService,
                OAuthMockClientRepository,
                {
                    provide : OAuthIClientRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthFindClientService);
        repository = module.get(OAuthIClientRepository);
        mockRepository = module.get(OAuthMockClientRepository);
    });

    describe('main', () =>
    {
        test('OAuthFindClientService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find client', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
