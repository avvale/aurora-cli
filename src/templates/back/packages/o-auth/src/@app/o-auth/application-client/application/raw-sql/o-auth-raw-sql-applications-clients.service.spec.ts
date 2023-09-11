import { OAuthIApplicationClientRepository, OAuthMockApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthRawSQLApplicationsClientsService } from '@app/o-auth/application-client/application/raw-sql/o-auth-raw-sql-applications-clients.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthRawSQLApplicationsClientsService ', () =>
{
    let service: OAuthRawSQLApplicationsClientsService ;
    let repository: OAuthIApplicationClientRepository;
    let mockRepository: OAuthMockApplicationClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthRawSQLApplicationsClientsService ,
                OAuthMockApplicationClientRepository,
                {
                    provide : OAuthIApplicationClientRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(OAuthRawSQLApplicationsClientsService );
        repository      = module.get(OAuthIApplicationClientRepository);
        mockRepository  = module.get(OAuthMockApplicationClientRepository);
    });

    describe('main', () =>
    {
        test('RawSQLApplicationsClientsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationsClients', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
