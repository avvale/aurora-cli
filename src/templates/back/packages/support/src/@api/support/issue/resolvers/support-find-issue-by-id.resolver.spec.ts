/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SupportFindIssueByIdHandler,
  SupportFindIssueByIdResolver,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindIssueByIdResolver', () => {
  let resolver: SupportFindIssueByIdResolver;
  let handler: SupportFindIssueByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportFindIssueByIdResolver,
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

    resolver = module.get<SupportFindIssueByIdResolver>(
      SupportFindIssueByIdResolver,
    );
    handler = module.get<SupportFindIssueByIdHandler>(
      SupportFindIssueByIdHandler,
    );
  });

  test('SupportFindIssueByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('SupportFindIssueByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an issue by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockIssueData[0])),
        );
      expect(await resolver.main(supportMockIssueData[0].id)).toBe(
        supportMockIssueData[0],
      );
    });
  });
});
