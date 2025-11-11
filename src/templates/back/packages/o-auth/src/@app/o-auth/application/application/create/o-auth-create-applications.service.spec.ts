/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthIApplicationRepository,
    OAuthMockApplicationRepository,
} from '@app/o-auth/application';
import { OAuthCreateApplicationsService } from '@app/o-auth/application/application/create/o-auth-create-applications.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationsService', () => {
    let service: OAuthCreateApplicationsService;
    let mockRepository: OAuthMockApplicationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthCreateApplicationsService,
                OAuthMockApplicationRepository,
                {
                    provide: OAuthIApplicationRepository,
                    useValue: {
                        insert: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthCreateApplicationsService);
        mockRepository = module.get(OAuthMockApplicationRepository);
    });

    describe('main', () => {
        test('CreateApplicationsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should create applications and emit event', async () => {
            expect(await service.main(mockRepository.collectionSource)).toBe(
                undefined,
            );
        });
    });
});
