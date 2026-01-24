import {
  SupportDeleteCommentByIdCommand,
  supportMockCommentData,
} from '@app/support/comment';
import { SupportDeleteCommentByIdCommandHandler } from '@app/support/comment/application/delete/support-delete-comment-by-id.command-handler';
import { SupportDeleteCommentByIdService } from '@app/support/comment/application/delete/support-delete-comment-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteCommentByIdCommandHandler', () => {
  let commandHandler: SupportDeleteCommentByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportDeleteCommentByIdCommandHandler,
        {
          provide: SupportDeleteCommentByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<SupportDeleteCommentByIdCommandHandler>(
      SupportDeleteCommentByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('SupportDeleteCommentByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the SupportDeleteCommentByIdService', async () => {
      expect(
        await commandHandler.execute(
          new SupportDeleteCommentByIdCommand(supportMockCommentData[0].id),
        ),
      ).toBe(undefined);
    });
  });
});
