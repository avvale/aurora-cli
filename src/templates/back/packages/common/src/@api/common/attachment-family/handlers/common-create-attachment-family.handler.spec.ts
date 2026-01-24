/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateAttachmentFamilyHandler } from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentFamilyHandler', () => {
  let handler: CommonCreateAttachmentFamilyHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonCreateAttachmentFamilyHandler,
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

    handler = module.get<CommonCreateAttachmentFamilyHandler>(
      CommonCreateAttachmentFamilyHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonCreateAttachmentFamilyHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an attachmentFamily created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentFamilyData[0]),
            ),
        );
      expect(
        await handler.main(commonMockAttachmentFamilyData[0], 'Europe/Madrid'),
      ).toBe(commonMockAttachmentFamilyData[0]);
    });
  });
});
