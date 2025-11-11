import {
    OAuthIApplicationClientRepository,
    OAuthMockApplicationClientRepository,
} from '@app/o-auth/application-client';
import { OAuthGetApplicationsClientsService } from '@app/o-auth/application-client/application/get/o-auth-get-applications-clients.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetApplicationsClientsService', () => {
    let service: OAuthGetApplicationsClientsService;
    let repository: OAuthIApplicationClientRepository;
    let mockRepository: OAuthMockApplicationClientRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthGetApplicationsClientsService,
                OAuthMockApplicationClientRepository,
                {
                    provide: OAuthIApplicationClientRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthGetApplicationsClientsService);
        repository = module.get(OAuthIApplicationClientRepository);
        mockRepository = module.get(OAuthMockApplicationClientRepository);
    });

    describe('main', () => {
        test('GetApplicationsClientsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should get applicationsClients', async () => {
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
