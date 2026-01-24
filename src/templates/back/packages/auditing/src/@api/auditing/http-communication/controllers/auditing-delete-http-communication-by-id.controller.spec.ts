/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingDeleteHttpCommunicationByIdController,
  AuditingDeleteHttpCommunicationByIdHandler,
} from '@api/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteHttpCommunicationByIdController', () => {
  let controller: AuditingDeleteHttpCommunicationByIdController;
  let handler: AuditingDeleteHttpCommunicationByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuditingDeleteHttpCommunicationByIdController],
      providers: [
        {
          provide: AuditingDeleteHttpCommunicationByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuditingDeleteHttpCommunicationByIdController>(
      AuditingDeleteHttpCommunicationByIdController,
    );
    handler = module.get<AuditingDeleteHttpCommunicationByIdHandler>(
      AuditingDeleteHttpCommunicationByIdHandler,
    );
  });

  describe('main', () => {
    test('AuditingDeleteHttpCommunicationByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an httpCommunication deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(auditingMockHttpCommunicationData[0]),
            ),
        );
      expect(
        await controller.main(auditingMockHttpCommunicationData[0].id),
      ).toBe(auditingMockHttpCommunicationData[0]);
    });
  });
});
