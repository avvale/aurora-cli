/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AuditingDeleteSideEffectByIdController,
  AuditingDeleteSideEffectByIdHandler,
} from '@api/auditing/side-effect';
import { auditingMockSideEffectData } from '@app/auditing/side-effect';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuditingDeleteSideEffectByIdController', () => {
  let controller: AuditingDeleteSideEffectByIdController;
  let handler: AuditingDeleteSideEffectByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuditingDeleteSideEffectByIdController],
      providers: [
        {
          provide: AuditingDeleteSideEffectByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<AuditingDeleteSideEffectByIdController>(
      AuditingDeleteSideEffectByIdController,
    );
    handler = module.get<AuditingDeleteSideEffectByIdHandler>(
      AuditingDeleteSideEffectByIdHandler,
    );
  });

  describe('main', () => {
    test('AuditingDeleteSideEffectByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an sideEffect deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(auditingMockSideEffectData[0])),
        );
      expect(await controller.main(auditingMockSideEffectData[0].id)).toBe(
        auditingMockSideEffectData[0],
      );
    });
  });
});
