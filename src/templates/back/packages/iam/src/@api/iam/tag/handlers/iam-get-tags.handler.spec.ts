/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetTagsHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetTagsHandler', () => {
  let handler: IamGetTagsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamGetTagsHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<IamGetTagsHandler>(IamGetTagsHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamGetTagsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamGetTagsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a iamMockTagData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTagData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(iamMockTagData);
    });
  });
});
