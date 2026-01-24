import {
  ToolsCreateProcedureController,
  ToolsCreateProcedureHandler,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateProcedureController', () => {
  let controller: ToolsCreateProcedureController;
  let handler: ToolsCreateProcedureHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ToolsCreateProcedureController],
      providers: [
        {
          provide: ToolsCreateProcedureHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ToolsCreateProcedureController>(
      ToolsCreateProcedureController,
    );
    handler = module.get<ToolsCreateProcedureHandler>(
      ToolsCreateProcedureHandler,
    );
  });

  describe('main', () => {
    test('ToolsCreateProcedureController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an procedure created', async () => {
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
