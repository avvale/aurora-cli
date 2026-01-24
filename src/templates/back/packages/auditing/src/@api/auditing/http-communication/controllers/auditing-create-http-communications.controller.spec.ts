import {
  AuditingCreateHttpCommunicationsController,
  AuditingCreateHttpCommunicationsHandler,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingCreateHttpCommunicationsController', () => {
  let controller: AuditingCreateHttpCommunicationsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditingCreateHttpCommunicationsController],
      providers: [
        {
          provide: AuditingCreateHttpCommunicationsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuditingCreateHttpCommunicationsController>(
      AuditingCreateHttpCommunicationsController,
    );
  });

  describe('main', () => {
    test('AuditingCreateHttpCommunicationsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an auditingMockHttpCommunicationData created', async () => {
      expect(await controller.main(auditingMockHttpCommunicationData)).toBe(
        undefined,
      );
    });
  });
});
