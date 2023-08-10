import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthGetApplicationsService } from './o-auth-get-applications.service';
import { OAuthIApplicationRepository } from '../../domain/o-auth-application.repository';
import { OAuthMockApplicationRepository } from '../../infrastructure/mock/o-auth-mock-application.repository';

describe('OAuthGetApplicationsService', () =>
{
    let service: OAuthGetApplicationsService;
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
                OAuthGetApplicationsService,
                OAuthMockApplicationRepository,
                {
                    provide : OAuthIApplicationRepository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthGetApplicationsService);
        repository = module.get(OAuthIApplicationRepository);
        mockRepository = module.get(OAuthMockApplicationRepository);
    });

    describe('main', () =>
    {
        test('GetApplicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applications', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
