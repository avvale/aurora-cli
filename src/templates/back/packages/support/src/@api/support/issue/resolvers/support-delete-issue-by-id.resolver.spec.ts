/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SupportDeleteIssueByIdHandler,
  SupportDeleteIssueByIdResolver,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteIssueByIdResolver', () => {
  let resolver: SupportDeleteIssueByIdResolver;
  let handler: SupportDeleteIssueByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportDeleteIssueByIdResolver,
        {
          provide: SupportDeleteIssueByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<SupportDeleteIssueByIdResolver>(
      SupportDeleteIssueByIdResolver,
    );
    handler = module.get<SupportDeleteIssueByIdHandler>(
      SupportDeleteIssueByIdHandler,
    );
  });

  test('SupportDeleteIssueByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('SupportDeleteIssueByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an issue deleted', async () => {
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
