import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthFindApplicationService } from './o-auth-find-application.service';
import { OAuthIApplicationRepository } from '../../domain/o-auth-application.repository';
import { OAuthMockApplicationRepository } from '../../infrastructure/mock/o-auth-mock-application.repository';

describe('OAuthFindApplicationService', () =>
{
    let service: OAuthFindApplicationService;
    let repository: OAuthIApplicationRepository;
    let mockRepository: OAuthMockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthFindApplicationService,
                OAuthMockApplicationRepository,
                {
                    provide : OAuthIApplicationRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthFindApplicationService);
        repository = module.get(OAuthIApplicationRepository);
        mockRepository = module.get(OAuthMockApplicationRepository);
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find application', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
