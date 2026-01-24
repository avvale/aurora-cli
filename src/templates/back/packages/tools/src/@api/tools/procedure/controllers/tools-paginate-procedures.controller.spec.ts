import {
  ToolsPaginateProceduresController,
  ToolsPaginateProceduresHandler,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateProceduresController', () => {
  let controller: ToolsPaginateProceduresController;
  let handler: ToolsPaginateProceduresHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsPaginateProceduresController],
      providers: [
        {
          provide: ToolsPaginateProceduresHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsPaginateProceduresController>(
      ToolsPaginateProceduresController,
    );
    handler = module.get<ToolsPaginateProceduresHandler>(
      ToolsPaginateProceduresHandler,
    );
  });

  describe('main', () => {
    test('ToolsPaginateProceduresController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a toolsMockProcedureData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: toolsMockProcedureData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: toolsMockProcedureData,
      });
    });
  });
});
