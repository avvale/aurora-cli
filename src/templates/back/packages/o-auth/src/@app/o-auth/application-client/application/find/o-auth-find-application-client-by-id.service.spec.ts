import {
    OAuthIApplicationClientRepository,
    oAuthMockApplicationClientData,
    OAuthMockApplicationClientRepository,
} from '@app/o-auth/application-client';
import { OAuthFindApplicationClientByIdService } from '@app/o-auth/application-client/application/find/o-auth-find-application-client-by-id.service';
import { OAuthApplicationClientId } from '@app/o-auth/application-client/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationClientByIdService', () => {
    let service: OAuthFindApplicationClientByIdService;
    let repository: OAuthIApplicationClientRepository;
    let mockRepository: OAuthMockApplicationClientRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthFindApplicationClientByIdService,
                OAuthMockApplicationClientRepository,
                {
                    provide: OAuthIApplicationClientRepository,
                    useValue: {
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthFindApplicationClientByIdService);
        repository = module.get(OAuthIApplicationClientRepository);
        mockRepository = module.get(OAuthMockApplicationClientRepository);
    });

    describe('main', () => {
        test('FindApplicationClientByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should find applicationClient by id', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new OAuthApplicationClientId(
                        oAuthMockApplicationClientData[0].id,
                    ),
                ),
            ).toBe(mockRepository.collectionSource[0]);
        });
    });
});
