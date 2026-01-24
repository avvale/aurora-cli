/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTagByIdInput } from '@api/graphql';
import { IamUpdateTagByIdHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTagByIdHandler', () => {
  let handler: IamUpdateTagByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        IamUpdateTagByIdHandler,
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

    handler = module.get<IamUpdateTagByIdHandler>(IamUpdateTagByIdHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('IamUpdateTagByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('IamUpdateTagByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a tag updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(iamMockTagData[0])),
        );
      expect(
        await handler.main(
          <IamUpdateTagByIdInput>iamMockTagData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(iamMockTagData[0]);
    });
  });
});
