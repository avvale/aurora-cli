import {
  AuditingPaginateHttpCommunicationsController,
  AuditingPaginateHttpCommunicationsHandler,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingPaginateHttpCommunicationsController', () => {
  let controller: AuditingPaginateHttpCommunicationsController;
  let handler: AuditingPaginateHttpCommunicationsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuditingPaginateHttpCommunicationsController],
      providers: [
        {
          provide: AuditingPaginateHttpCommunicationsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuditingPaginateHttpCommunicationsController>(
      AuditingPaginateHttpCommunicationsController,
    );
    handler = module.get<AuditingPaginateHttpCommunicationsHandler>(
      AuditingPaginateHttpCommunicationsHandler,
    );
  });

  describe('main', () => {
    test('AuditingPaginateHttpCommunicationsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a auditingMockHttpCommunicationData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: auditingMockHttpCommunicationData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: auditingMockHttpCommunicationData,
      });
    });
  });
});
