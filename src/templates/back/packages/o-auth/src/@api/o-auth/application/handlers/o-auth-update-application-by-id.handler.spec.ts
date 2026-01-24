/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateApplicationByIdInput } from '@api/graphql';
import { OAuthUpdateApplicationByIdHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationByIdHandler', () => {
  let handler: OAuthUpdateApplicationByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthUpdateApplicationByIdHandler,
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

    handler = module.get<OAuthUpdateApplicationByIdHandler>(
      OAuthUpdateApplicationByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('OAuthUpdateApplicationByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('OAuthUpdateApplicationByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a application updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockApplicationData[0])),
        );
      expect(
        await handler.main(
          <OAuthUpdateApplicationByIdInput>oAuthMockApplicationData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(oAuthMockApplicationData[0]);
    });
  });
});
