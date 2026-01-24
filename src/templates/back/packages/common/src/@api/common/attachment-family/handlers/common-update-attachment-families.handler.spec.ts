/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAttachmentFamiliesHandler } from '@api/common/attachment-family';
import { CommonUpdateAttachmentFamiliesInput } from '@api/graphql';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentFamiliesHandler', () => {
  let handler: CommonUpdateAttachmentFamiliesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpdateAttachmentFamiliesHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonUpdateAttachmentFamiliesHandler>(
      CommonUpdateAttachmentFamiliesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonUpdateAttachmentFamiliesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateAttachmentFamiliesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a attachmentFamilies updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentFamilyData[0]),
            ),
        );
      expect(
        await handler.main(
          <CommonUpdateAttachmentFamiliesInput>(
            commonMockAttachmentFamilyData[0]
          ),
          {},
          {},
          'Europe/Madrid',
        ),
      ).toBe(commonMockAttachmentFamilyData[0]);
    });
  });
});
