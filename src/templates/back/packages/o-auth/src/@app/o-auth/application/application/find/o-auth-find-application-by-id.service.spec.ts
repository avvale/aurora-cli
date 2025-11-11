import {
    OAuthIApplicationRepository,
    oAuthMockApplicationData,
    OAuthMockApplicationRepository,
} from '@app/o-auth/application';
import { OAuthFindApplicationByIdService } from '@app/o-auth/application/application/find/o-auth-find-application-by-id.service';
import { OAuthApplicationId } from '@app/o-auth/application/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationByIdService', () => {
    let service: OAuthFindApplicationByIdService;
    let repository: OAuthIApplicationRepository;
    let mockRepository: OAuthMockApplicationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthFindApplicationByIdService,
                OAuthMockApplicationRepository,
                {
                    provide: OAuthIApplicationRepository,
                    useValue: {
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthFindApplicationByIdService);
        repository = module.get(OAuthIApplicationRepository);
        mockRepository = module.get(OAuthMockApplicationRepository);
    });

    describe('main', () => {
        test('FindApplicationByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find application by id', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new OAuthApplicationId(oAuthMockApplicationData[0].id),
                ),
            ).toBe(mockRepository.collectionSource[0]);
        });
    });
});
