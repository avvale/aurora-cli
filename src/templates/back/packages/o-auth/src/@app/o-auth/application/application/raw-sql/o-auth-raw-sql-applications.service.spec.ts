import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { OAuthRawSQLApplicationsService } from './o-auth-raw-sql-applications.service';
import { OAuthIApplicationRepository } from '../../domain/o-auth-application.repository';
import { OAuthMockApplicationRepository } from '../../infrastructure/mock/o-auth-mock-application.repository';

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
