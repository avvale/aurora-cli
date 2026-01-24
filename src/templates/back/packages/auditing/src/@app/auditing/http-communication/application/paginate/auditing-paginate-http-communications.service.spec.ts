import {
  AuditingIHttpCommunicationRepository,
  AuditingMockHttpCommunicationRepository,
} from '@app/auditing/http-communication';
import { AuditingPaginateHttpCommunicationsService } from '@app/auditing/http-communication/application/paginate/auditing-paginate-http-communications.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingPaginateHttpCommunicationsService', () => {
  let service: AuditingPaginateHttpCommunicationsService;
  let repository: AuditingIHttpCommunicationRepository;
  let mockRepository: AuditingMockHttpCommunicationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        AuditingPaginateHttpCommunicationsService,
        AuditingMockHttpCommunicationRepository,
        {
          provide: AuditingIHttpCommunicationRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(AuditingPaginateHttpCommunicationsService);
    repository = module.get(AuditingIHttpCommunicationRepository);
    mockRepository = module.get(AuditingMockHttpCommunicationRepository);
  });

  describe('main', () => {
    test('AuditingPaginateHttpCommunicationsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate httpCommunications', async () => {
      jest.spyOn(repository, 'paginate').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: mockRepository.collectionSource.slice(0, 10).length,
              count: mockRepository.collectionSource.slice(0, 10).length,
              rows: mockRepository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await service.main({
          offset: 0,
          limit: 10,
        }),
      ).toStrictEqual({
        total: mockRepository.collectionSource.slice(0, 10).length,
        count: mockRepository.collectionSource.slice(0, 10).length,
        rows: mockRepository.collectionSource.slice(0, 10),
      });
    });
  });
});
