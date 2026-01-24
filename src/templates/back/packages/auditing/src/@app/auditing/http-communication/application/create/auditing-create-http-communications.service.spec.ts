/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingIHttpCommunicationRepository,
  AuditingMockHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import { AuditingCreateHttpCommunicationsService } from '@app/auditing/http-communication/application/create/auditing-create-http-communications.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateHttpCommunicationsService', () => {
  let service: AuditingCreateHttpCommunicationsService;
  let mockRepository: AuditingMockHttpCommunicationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        AuditingCreateHttpCommunicationsService,
        AuditingMockHttpCommunicationRepository,
        {
          provide: AuditingIHttpCommunicationRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(AuditingCreateHttpCommunicationsService);
    mockRepository = module.get(AuditingMockHttpCommunicationRepository);
  });

  describe('main', () => {
    test('CreateHttpCommunicationsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create httpCommunications and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
