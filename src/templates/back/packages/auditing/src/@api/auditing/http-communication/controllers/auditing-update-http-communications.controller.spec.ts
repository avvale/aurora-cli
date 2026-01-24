import {
  AuditingUpdateHttpCommunicationsController,
  AuditingUpdateHttpCommunicationsHandler,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingUpdateHttpCommunicationsController', () => {
  let controller: AuditingUpdateHttpCommunicationsController;
  let handler: AuditingUpdateHttpCommunicationsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuditingUpdateHttpCommunicationsController],
      providers: [
        {
          provide: AuditingUpdateHttpCommunicationsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuditingUpdateHttpCommunicationsController>(
      AuditingUpdateHttpCommunicationsController,
    );
    handler = module.get<AuditingUpdateHttpCommunicationsHandler>(
      AuditingUpdateHttpCommunicationsHandler,
    );
  });

  describe('main', () => {
    test('AuditingUpdateHttpCommunicationsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a httpCommunications updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(auditingMockHttpCommunicationData[0]),
            ),
        );
      expect(await controller.main(auditingMockHttpCommunicationData[0])).toBe(
        auditingMockHttpCommunicationData[0],
      );
    });
  });
});
