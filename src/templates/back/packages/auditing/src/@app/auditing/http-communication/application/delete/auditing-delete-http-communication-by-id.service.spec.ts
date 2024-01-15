/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingIHttpCommunicationRepository, auditingMockHttpCommunicationData, AuditingMockHttpCommunicationRepository } from '@app/auditing/http-communication';
import { AuditingDeleteHttpCommunicationByIdService } from '@app/auditing/http-communication/application/delete/auditing-delete-http-communication-by-id.service';
import { AuditingHttpCommunicationId } from '@app/auditing/http-communication/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteHttpCommunicationByIdService', () =>
{
    let service: AuditingDeleteHttpCommunicationByIdService;
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
                AuditingDeleteHttpCommunicationByIdService,
                AuditingMockHttpCommunicationRepository,
                {
                    provide : AuditingIHttpCommunicationRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AuditingDeleteHttpCommunicationByIdService);
        repository = module.get(AuditingIHttpCommunicationRepository);
        mockRepository = module.get(AuditingMockHttpCommunicationRepository);
    });

    describe('main', () =>
    {
        test('AuditingDeleteHttpCommunicationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete httpCommunication and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new AuditingHttpCommunicationId(auditingMockHttpCommunicationData[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
