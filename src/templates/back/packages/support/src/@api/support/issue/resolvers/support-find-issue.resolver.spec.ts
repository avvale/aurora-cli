/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SupportFindIssueHandler,
  SupportFindIssueResolver,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindIssueResolver', () => {
  let resolver: SupportFindIssueResolver;
  let handler: SupportFindIssueHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportFindIssueResolver,
        {
          provide: SupportFindIssueHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<SupportFindIssueResolver>(SupportFindIssueResolver);
    handler = module.get<SupportFindIssueHandler>(SupportFindIssueHandler);
  });

  test('SupportFindIssueResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('SupportFindIssueResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a issue', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockIssueData[0])),
        );
      expect(await resolver.main()).toBe(supportMockIssueData[0]);
    });
  });
});
