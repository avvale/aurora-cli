/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SupportGetIssuesHandler,
  SupportGetIssuesResolver,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportGetIssuesResolver', () => {
  let resolver: SupportGetIssuesResolver;
  let handler: SupportGetIssuesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportGetIssuesResolver,
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

    resolver = module.get<SupportGetIssuesResolver>(SupportGetIssuesResolver);
    handler = module.get<SupportGetIssuesHandler>(SupportGetIssuesHandler);
  });

  test('SupportGetIssuesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('SupportGetIssuesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a supportMockIssueData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockIssueData)),
        );
      expect(await resolver.main()).toBe(supportMockIssueData);
    });
  });
});
