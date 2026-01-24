import {
  AuditingIHttpCommunicationRepository,
  AuditingMockHttpCommunicationRepository,
  AuditingPaginateHttpCommunicationsQuery,
} from '@app/auditing/http-communication';
import { AuditingPaginateHttpCommunicationsQueryHandler } from '@app/auditing/http-communication/application/paginate/auditing-paginate-http-communications.query-handler';
import { AuditingPaginateHttpCommunicationsService } from '@app/auditing/http-communication/application/paginate/auditing-paginate-http-communications.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingPaginateHttpCommunicationsQueryHandler', () => {
  let queryHandler: AuditingPaginateHttpCommunicationsQueryHandler;
  let service: AuditingPaginateHttpCommunicationsService;
  let repository: AuditingMockHttpCommunicationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditingPaginateHttpCommunicationsQueryHandler,
        {
          provide: AuditingIHttpCommunicationRepository,
          useClass: AuditingMockHttpCommunicationRepository,
        },
        {
          provide: AuditingPaginateHttpCommunicationsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<AuditingPaginateHttpCommunicationsQueryHandler>(
      AuditingPaginateHttpCommunicationsQueryHandler,
    );
    service = module.get<AuditingPaginateHttpCommunicationsService>(
      AuditingPaginateHttpCommunicationsService,
    );
    repository = <AuditingMockHttpCommunicationRepository>(
      module.get<AuditingIHttpCommunicationRepository>(
        AuditingIHttpCommunicationRepository,
      )
    );
  });

  describe('main', () => {
    test('AuditingPaginateHttpCommunicationsQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an httpCommunications paginated', async () => {
      jest.spyOn(service, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              count: 10,
              total: 100,
              rows: repository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await queryHandler.execute(
          new AuditingPaginateHttpCommunicationsQuery({
            offset: 0,
            limit: 10,
          }),
        ),
      ).toStrictEqual(
        new PaginationResponse(
          100,
          10,
          repository.collectionSource.slice(0, 10).map((item) => item.toDTO()),
        ),
      );
    });
  });
});
