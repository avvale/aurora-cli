import {
  AuditingFindHttpCommunicationController,
  AuditingFindHttpCommunicationHandler,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingFindHttpCommunicationController', () => {
  let controller: AuditingFindHttpCommunicationController;
  let handler: AuditingFindHttpCommunicationHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuditingFindHttpCommunicationController],
      providers: [
        {
          provide: AuditingFindHttpCommunicationHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuditingFindHttpCommunicationController>(
      AuditingFindHttpCommunicationController,
    );
    handler = module.get<AuditingFindHttpCommunicationHandler>(
      AuditingFindHttpCommunicationHandler,
    );
  });

  describe('main', () => {
    test('AuditingFindHttpCommunicationController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a httpCommunication', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(auditingMockHttpCommunicationData[0]),
            ),
        );
      expect(await controller.main()).toBe(
        auditingMockHttpCommunicationData[0],
      );
    });
  });
});
