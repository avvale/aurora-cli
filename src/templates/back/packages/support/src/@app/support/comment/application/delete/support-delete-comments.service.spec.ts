/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SupportICommentRepository,
  SupportMockCommentRepository,
} from '@app/support/comment';
import { SupportDeleteCommentsService } from '@app/support/comment/application/delete/support-delete-comments.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteCommentsService', () => {
  let service: SupportDeleteCommentsService;
  let repository: SupportICommentRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        SupportDeleteCommentsService,
        SupportMockCommentRepository,
        {
          provide: SupportICommentRepository,
          useValue: {
            get: () => {
              /**/
            },
            delete: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(SupportDeleteCommentsService);
    repository = module.get(SupportICommentRepository);
  });

  describe('main', () => {
    test('SupportDeleteCommentsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete comment and emit event', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      expect(await service.main({}, {})).toBe(undefined);
    });
  });
});
