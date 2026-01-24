import {
  ToolsCreateKeyValuesCommand,
  toolsMockKeyValueData,
} from '@app/tools/key-value';
import { ToolsCreateKeyValuesCommandHandler } from '@app/tools/key-value/application/create/tools-create-key-values.command-handler';
import { ToolsCreateKeyValuesService } from '@app/tools/key-value/application/create/tools-create-key-values.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('toolsCreateKeyValuesCommandHandler', () => {
  let commandHandler: ToolsCreateKeyValuesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsCreateKeyValuesCommandHandler,
        {
          provide: ToolsCreateKeyValuesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<ToolsCreateKeyValuesCommandHandler>(
      ToolsCreateKeyValuesCommandHandler,
    );
  });

  describe('main', () => {
    test('ToolsCreateKeyValuesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return ToolsMockKeyValueData created', async () => {
      expect(
        await commandHandler.execute(
          new ToolsCreateKeyValuesCommand(toolsMockKeyValueData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
