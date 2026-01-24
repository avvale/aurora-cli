import {
  ToolsUpdateProcedureByIdController,
  ToolsUpdateProcedureByIdHandler,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateProcedureByIdController', () => {
  let controller: ToolsUpdateProcedureByIdController;
  let handler: ToolsUpdateProcedureByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsUpdateProcedureByIdController],
      providers: [
        {
          provide: ToolsUpdateProcedureByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsUpdateProcedureByIdController>(
      ToolsUpdateProcedureByIdController,
    );
    handler = module.get<ToolsUpdateProcedureByIdHandler>(
      ToolsUpdateProcedureByIdHandler,
    );
  });

  describe('main', () => {
    test('ToolsUpdateProcedureByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a procedure updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockProcedureData[0])),
        );
      expect(await controller.main(toolsMockProcedureData[0])).toBe(
        toolsMockProcedureData[0],
      );
    });
  });
});
