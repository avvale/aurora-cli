import { AuditingIHttpCommunicationRepository, AuditingMockHttpCommunicationRepository } from '@app/auditing/http-communication';
import { AuditingRawSQLHttpCommunicationsService } from '@app/auditing/http-communication/application/raw-sql/auditing-raw-sql-http-communications.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingRawSQLHttpCommunicationsService ', () =>
{
    let service: AuditingRawSQLHttpCommunicationsService ;
    let repository: AuditingIHttpCommunicationRepository;
    let mockRepository: AuditingMockHttpCommunicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AuditingRawSQLHttpCommunicationsService ,
                AuditingMockHttpCommunicationRepository,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AuditingRawSQLHttpCommunicationsService );
        repository      = module.get(AuditingIHttpCommunicationRepository);
        mockRepository  = module.get(AuditingMockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('RawSQLHttpCommunicationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get httpCommunications', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
