import { OAuthIClientRepository, OAuthMockClientRepository } from '@app/o-auth/client';
import { OAuthRawSQLClientsService } from '@app/o-auth/client/application/raw-sql/o-auth-raw-sql-clients.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthRawSQLClientsService ', () =>
{
    let service: OAuthRawSQLClientsService ;
    let repository: OAuthIClientRepository;
    let mockRepository: OAuthMockClientRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                OAuthRawSQLClientsService ,
                OAuthMockClientRepository,
                {
                    provide : OAuthIClientRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(OAuthRawSQLClientsService );
        repository      = module.get(OAuthIClientRepository);
        mockRepository  = module.get(OAuthMockClientRepository);
    });

    describe('main', () =>
    {
        test('RawSQLClientsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get clients', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
