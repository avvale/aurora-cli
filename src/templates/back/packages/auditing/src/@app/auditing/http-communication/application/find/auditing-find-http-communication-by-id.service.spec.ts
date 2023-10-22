import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication/infrastructure/mock/auditing-mock-http-communication.data';
import { AuditingFindHttpCommunicationByIdService } from './auditing-find-http-communication-by-id.service';
import { AuditingHttpCommunicationId } from '../../domain/value-objects';
import { AuditingIHttpCommunicationRepository } from '../../domain/auditing-http-communication.repository';
import { AuditingMockHttpCommunicationRepository } from '../../infrastructure/mock/auditing-mock-http-communication.repository';

describe('AuditingFindHttpCommunicationByIdService', () =>
{
    let service: AuditingFindHttpCommunicationByIdService;
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
                AuditingFindHttpCommunicationByIdService,
                AuditingMockHttpCommunicationRepository,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingFindHttpCommunicationByIdService);
        repository = module.get(AuditingIHttpCommunicationRepository);
        mockRepository = module.get(AuditingMockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('FindHttpCommunicationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find httpCommunication by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AuditingHttpCommunicationId(auditingMockHttpCommunicationData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
