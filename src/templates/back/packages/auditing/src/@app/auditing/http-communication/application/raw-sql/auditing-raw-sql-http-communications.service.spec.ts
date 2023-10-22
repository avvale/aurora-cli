import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AuditingRawSQLHttpCommunicationsService } from './auditing-raw-sql-http-communications.service';
import { AuditingIHttpCommunicationRepository } from '../../domain/auditing-http-communication.repository';
import { AuditingMockHttpCommunicationRepository } from '../../infrastructure/mock/auditing-mock-http-communication.repository';

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
