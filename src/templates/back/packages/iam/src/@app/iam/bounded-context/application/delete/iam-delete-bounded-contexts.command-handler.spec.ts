/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamDeleteBoundedContextsCommand } from '@app/iam/bounded-context';
import { IamDeleteBoundedContextsCommandHandler } from '@app/iam/bounded-context/application/delete/iam-delete-bounded-contexts.command-handler';
import { IamDeleteBoundedContextsService } from '@app/iam/bounded-context/application/delete/iam-delete-bounded-contexts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteBoundedContextsCommandHandler', () => {
  let commandHandler: IamDeleteBoundedContextsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamDeleteBoundedContextsCommandHandler,
        {
          provide: IamDeleteBoundedContextsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamDeleteBoundedContextsCommandHandler>(
      IamDeleteBoundedContextsCommandHandler,
    );
  });

  describe('main', () => {
    test('IamDeleteBoundedContextsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return void', async () => {
      expect(
        await commandHandler.execute(new IamDeleteBoundedContextsCommand()),
      ).toBe(undefined);
    });
  });
});
