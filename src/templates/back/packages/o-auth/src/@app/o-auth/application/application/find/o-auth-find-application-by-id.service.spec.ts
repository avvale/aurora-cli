import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { oAuthMockApplicationData } from '@app/o-auth/application/infrastructure/mock/o-auth-mock-application.data';
import { OAuthFindApplicationByIdService } from './o-auth-find-application-by-id.service';
import { OAuthApplicationId } from '../../domain/value-objects';
import { OAuthIApplicationRepository } from '../../domain/o-auth-application.repository';
import { OAuthMockApplicationRepository } from '../../infrastructure/mock/o-auth-mock-application.repository';

describe('OAuthFindApplicationByIdService', () =>
{
    let service: OAuthFindApplicationByIdService;
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
                OAuthFindApplicationByIdService,
                OAuthMockApplicationRepository,
                {
                    provide : OAuthIApplicationRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(OAuthFindApplicationByIdService);
        repository = module.get(OAuthIApplicationRepository);
        mockRepository = module.get(OAuthMockApplicationRepository);
    });

    describe('main', () =>
    {
        test('FindApplicationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find application by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new OAuthApplicationId(oAuthMockApplicationData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
