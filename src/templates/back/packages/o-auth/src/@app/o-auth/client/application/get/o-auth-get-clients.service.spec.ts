import {
    OAuthIClientRepository,
    OAuthMockClientRepository,
} from '@app/o-auth/client';
import { OAuthGetClientsService } from '@app/o-auth/client/application/get/o-auth-get-clients.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetClientsService', () => {
    let service: OAuthGetClientsService;
    let repository: OAuthIClientRepository;
    let mockRepository: OAuthMockClientRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthGetClientsService,
                OAuthMockClientRepository,
                {
                    provide: OAuthIClientRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthGetClientsService);
        repository = module.get(OAuthIClientRepository);
        mockRepository = module.get(OAuthMockClientRepository);
    });

    describe('main', () => {
        test('GetClientsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should get clients', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource),
                    ),
            );
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
