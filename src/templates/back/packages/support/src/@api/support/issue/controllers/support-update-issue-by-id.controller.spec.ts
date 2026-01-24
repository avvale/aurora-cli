import {
  SupportUpdateIssueByIdController,
  SupportUpdateIssueByIdHandler,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateIssueByIdController', () => {
  let controller: SupportUpdateIssueByIdController;
  let handler: SupportUpdateIssueByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SupportUpdateIssueByIdController],
      providers: [
        {
          provide: SupportUpdateIssueByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SupportUpdateIssueByIdController>(
      SupportUpdateIssueByIdController,
    );
    handler = module.get<SupportUpdateIssueByIdHandler>(
      SupportUpdateIssueByIdHandler,
    );
  });

  describe('main', () => {
    test('SupportUpdateIssueByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a issue updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockIssueData[0])),
        );
      expect(await controller.main(supportMockIssueData[0])).toBe(
        supportMockIssueData[0],
      );
    });
  });
});
