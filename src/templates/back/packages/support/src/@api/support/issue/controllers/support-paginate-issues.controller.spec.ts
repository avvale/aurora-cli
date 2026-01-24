import {
  SupportPaginateIssuesController,
  SupportPaginateIssuesHandler,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportPaginateIssuesController', () => {
  let controller: SupportPaginateIssuesController;
  let handler: SupportPaginateIssuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SupportPaginateIssuesController],
      providers: [
        {
          provide: SupportPaginateIssuesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SupportPaginateIssuesController>(
      SupportPaginateIssuesController,
    );
    handler = module.get<SupportPaginateIssuesHandler>(
      SupportPaginateIssuesHandler,
    );
  });

  describe('main', () => {
    test('SupportPaginateIssuesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a supportMockIssueData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: supportMockIssueData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: supportMockIssueData,
      });
    });
  });
});
