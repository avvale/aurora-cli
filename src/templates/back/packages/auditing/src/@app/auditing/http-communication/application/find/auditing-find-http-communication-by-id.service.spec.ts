import {
  AuditingIHttpCommunicationRepository,
  auditingMockHttpCommunicationData,
  AuditingMockHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import { AuditingFindHttpCommunicationByIdService } from '@app/auditing/http-communication/application/find/auditing-find-http-communication-by-id.service';
import { AuditingHttpCommunicationId } from '@app/auditing/http-communication/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindHttpCommunicationByIdService', () => {
  let service: AuditingFindHttpCommunicationByIdService;
  let repository: AuditingIHttpCommunicationRepository;
  let mockRepository: AuditingMockHttpCommunicationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        AuditingFindHttpCommunicationByIdService,
        AuditingMockHttpCommunicationRepository,
        {
          provide: AuditingIHttpCommunicationRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(AuditingFindHttpCommunicationByIdService);
    repository = module.get(AuditingIHttpCommunicationRepository);
    mockRepository = module.get(AuditingMockHttpCommunicationRepository);
  });

  describe('main', () => {
    test('FindHttpCommunicationByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find httpCommunication by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(
          new AuditingHttpCommunicationId(
            auditingMockHttpCommunicationData[0].id,
          ),
        ),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
