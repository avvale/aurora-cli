import {
  SupportFindIssueByIdController,
  SupportFindIssueByIdHandler,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindIssueByIdController', () => {
  let controller: SupportFindIssueByIdController;
  let handler: SupportFindIssueByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SupportFindIssueByIdController],
      providers: [
        {
          provide: SupportFindIssueByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SupportFindIssueByIdController>(
      SupportFindIssueByIdController,
    );
    handler = module.get<SupportFindIssueByIdHandler>(
      SupportFindIssueByIdHandler,
    );
  });

  describe('main', () => {
    test('SupportFindIssueByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an issue by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockIssueData[0])),
        );
      expect(await controller.main(supportMockIssueData[0].id)).toBe(
        supportMockIssueData[0],
      );
    });
  });
});
