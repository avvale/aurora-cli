import { OAuthIApplicationRepository, OAuthMockApplicationRepository } from '@app/o-auth/application';
import { OAuthRawSQLApplicationsService } from '@app/o-auth/application/application/raw-sql/o-auth-raw-sql-applications.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthRawSQLApplicationsService ', () =>
{
    let service: OAuthRawSQLApplicationsService ;
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
                OAuthRawSQLApplicationsService ,
                OAuthMockApplicationRepository,
                {
                    provide : OAuthIApplicationRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(OAuthRawSQLApplicationsService );
        repository      = module.get(OAuthIApplicationRepository);
        mockRepository  = module.get(OAuthMockApplicationRepository);
    });

    describe('main', () =>
    {
        test('RawSQLApplicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applications', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
