import {
    OAuthIApplicationRepository,
    OAuthMockApplicationRepository,
} from '@app/o-auth/application';
import { OAuthFindApplicationService } from '@app/o-auth/application/application/find/o-auth-find-application.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationService', () => {
    let service: OAuthFindApplicationService;
    let repository: OAuthIApplicationRepository;
    let mockRepository: OAuthMockApplicationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthFindApplicationService,
                OAuthMockApplicationRepository,
                {
                    provide: OAuthIApplicationRepository,
                    useValue: {
                        find: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthFindApplicationService);
        repository = module.get(OAuthIApplicationRepository);
        mockRepository = module.get(OAuthMockApplicationRepository);
    });

    describe('main', () => {
        test('OAuthFindApplicationService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find application', async () => {
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
