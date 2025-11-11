/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthIApplicationRepository,
    oAuthMockApplicationData,
    OAuthMockApplicationRepository,
} from '@app/o-auth/application';
import { OAuthDeleteApplicationByIdService } from '@app/o-auth/application/application/delete/o-auth-delete-application-by-id.service';
import { OAuthApplicationId } from '@app/o-auth/application/domain/value-objects';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationByIdService', () => {
    let service: OAuthDeleteApplicationByIdService;
    let repository: OAuthIApplicationRepository;
    let mockRepository: OAuthMockApplicationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthDeleteApplicationByIdService,
                OAuthMockApplicationRepository,
                {
                    provide: OAuthIApplicationRepository,
                    useValue: {
                        deleteById: (id) => {
                            /**/
                        },
                        findById: (id) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthDeleteApplicationByIdService);
        repository = module.get(OAuthIApplicationRepository);
        mockRepository = module.get(OAuthMockApplicationRepository);
    });

    describe('main', () => {
        test('OAuthDeleteApplicationByIdService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete application and emit event', async () => {
            jest.spyOn(repository, 'findById').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(mockRepository.collectionSource[0]),
                    ),
            );
            expect(
                await service.main(
                    new OAuthApplicationId(oAuthMockApplicationData[0].id),
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
