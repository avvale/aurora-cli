import {
  AuditingCreateHttpCommunicationController,
  AuditingCreateHttpCommunicationHandler,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateHttpCommunicationController', () => {
  let controller: AuditingCreateHttpCommunicationController;
  let handler: AuditingCreateHttpCommunicationHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuditingCreateHttpCommunicationController],
      providers: [
        {
          provide: AuditingCreateHttpCommunicationHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuditingCreateHttpCommunicationController>(
      AuditingCreateHttpCommunicationController,
    );
    handler = module.get<AuditingCreateHttpCommunicationHandler>(
      AuditingCreateHttpCommunicationHandler,
    );
  });

  describe('main', () => {
    test('AuditingCreateHttpCommunicationController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an httpCommunication created', async () => {
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
