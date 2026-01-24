import { iamMockTagData, IamUpdateTagByIdCommand } from '@app/iam/tag';
import { IamUpdateTagByIdCommandHandler } from '@app/iam/tag/application/update/iam-update-tag-by-id.command-handler';
import { IamUpdateTagByIdService } from '@app/iam/tag/application/update/iam-update-tag-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTagByIdCommandHandler', () => {
  let commandHandler: IamUpdateTagByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IamUpdateTagByIdCommandHandler,
        {
          provide: IamUpdateTagByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<IamUpdateTagByIdCommandHandler>(
      IamUpdateTagByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateTagByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an tag created', async () => {
      expect(
        await commandHandler.execute(
          new IamUpdateTagByIdCommand(
            {
              id: iamMockTagData[0].id,
              rowId: iamMockTagData[0].rowId,
              name: iamMockTagData[0].name,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
