/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamCreateTagHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTagHandler', () => {
  let handler: IamCreateTagHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamCreateTagHandler,
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

    handler = module.get<IamCreateTagHandler>(IamCreateTagHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('IamCreateTagHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an tag created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTagData[0])),
        );
      expect(await handler.main(iamMockTagData[0], 'Europe/Madrid')).toBe(
        iamMockTagData[0],
      );
    });
  });
});
