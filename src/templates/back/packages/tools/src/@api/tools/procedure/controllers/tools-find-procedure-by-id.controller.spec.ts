import {
  ToolsFindProcedureByIdController,
  ToolsFindProcedureByIdHandler,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindProcedureByIdController', () => {
  let controller: ToolsFindProcedureByIdController;
  let handler: ToolsFindProcedureByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsFindProcedureByIdController],
      providers: [
        {
          provide: ToolsFindProcedureByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsFindProcedureByIdController>(
      ToolsFindProcedureByIdController,
    );
    handler = module.get<ToolsFindProcedureByIdHandler>(
      ToolsFindProcedureByIdHandler,
    );
  });

  describe('main', () => {
    test('ToolsFindProcedureByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an procedure by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockProcedureData[0])),
        );
      expect(await controller.main(toolsMockProcedureData[0].id)).toBe(
        toolsMockProcedureData[0],
      );
    });
  });
});
