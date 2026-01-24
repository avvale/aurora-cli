import {
  SupportGetIssuesController,
  SupportGetIssuesHandler,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportGetIssuesController', () => {
  let controller: SupportGetIssuesController;
  let handler: SupportGetIssuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SupportGetIssuesController],
      providers: [
        {
          provide: SupportGetIssuesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SupportGetIssuesController>(
      SupportGetIssuesController,
    );
    handler = module.get<SupportGetIssuesHandler>(SupportGetIssuesHandler);
  });

  describe('main', () => {
    test('SupportGetIssuesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a supportMockIssueData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockIssueData)),
        );
      expect(await controller.main()).toBe(supportMockIssueData);
    });
  });
});
