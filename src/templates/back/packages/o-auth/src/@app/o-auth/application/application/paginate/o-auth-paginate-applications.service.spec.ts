import {
    OAuthIApplicationRepository,
    OAuthMockApplicationRepository,
} from '@app/o-auth/application';
import { OAuthPaginateApplicationsService } from '@app/o-auth/application/application/paginate/o-auth-paginate-applications.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateApplicationsService', () => {
    let service: OAuthPaginateApplicationsService;
    let repository: OAuthIApplicationRepository;
    let mockRepository: OAuthMockApplicationRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthPaginateApplicationsService,
                OAuthMockApplicationRepository,
                {
                    provide: OAuthIApplicationRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(OAuthPaginateApplicationsService);
        repository = module.get(OAuthIApplicationRepository);
        mockRepository = module.get(OAuthMockApplicationRepository);
    });

    describe('main', () => {
        test('OAuthPaginateApplicationsService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should paginate applications', async () => {
            jest.spyOn(repository, 'paginate').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: mockRepository.collectionSource.slice(0, 10)
                                .length,
                            count: mockRepository.collectionSource.slice(0, 10)
                                .length,
                            rows: mockRepository.collectionSource.slice(0, 10),
                        }),
                    ),
            );
            expect(
                await service.main({
                    offset: 0,
                    limit: 10,
                }),
            ).toStrictEqual({
                total: mockRepository.collectionSource.slice(0, 10).length,
                count: mockRepository.collectionSource.slice(0, 10).length,
                rows: mockRepository.collectionSource.slice(0, 10),
            });
        });
    });
});
