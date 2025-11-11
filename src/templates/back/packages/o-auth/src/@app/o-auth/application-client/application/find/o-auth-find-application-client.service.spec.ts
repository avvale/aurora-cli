import {
    OAuthIApplicationClientRepository,
    OAuthMockApplicationClientRepository,
} from '@app/o-auth/application-client';
import { OAuthFindApplicationClientService } from '@app/o-auth/application-client/application/find/o-auth-find-application-client.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationClientService', () => {
    let service: OAuthFindApplicationClientService;
    let repository: OAuthIApplicationClientRepository;
    let mockRepository: OAuthMockApplicationClientRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthFindApplicationClientService,
                OAuthMockApplicationClientRepository,
                {
                    provide: OAuthIApplicationClientRepository,
                    useValue: {
                        find: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthFindApplicationClientService);
        repository = module.get(OAuthIApplicationClientRepository);
        mockRepository = module.get(OAuthMockApplicationClientRepository);
    });

    describe('main', () => {
        test('OAuthFindApplicationClientService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find applicationClient', async () => {
            jest.spyOn(repository, 'find').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(await service.main()).toBe(
                mockRepository.collectionSource[0],
            );
        });
    });
});
