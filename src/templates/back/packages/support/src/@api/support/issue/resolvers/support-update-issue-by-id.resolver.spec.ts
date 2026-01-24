/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportUpdateIssueByIdInput } from '@api/graphql';
import {
  SupportUpdateIssueByIdHandler,
  SupportUpdateIssueByIdResolver,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateIssueByIdResolver', () => {
  let resolver: SupportUpdateIssueByIdResolver;
  let handler: SupportUpdateIssueByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportUpdateIssueByIdResolver,
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

    resolver = module.get<SupportUpdateIssueByIdResolver>(
      SupportUpdateIssueByIdResolver,
    );
    handler = module.get<SupportUpdateIssueByIdHandler>(
      SupportUpdateIssueByIdHandler,
    );
  });

  test('SupportUpdateIssueByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('SupportUpdateIssueByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a issue by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockIssueData[0])),
        );
      expect(
        await resolver.main(
          <SupportUpdateIssueByIdInput>supportMockIssueData[0],
        ),
      ).toBe(supportMockIssueData[0]);
    });
  });
});
