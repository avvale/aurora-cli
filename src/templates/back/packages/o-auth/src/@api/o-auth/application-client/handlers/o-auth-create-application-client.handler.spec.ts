/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthCreateApplicationClientHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationClientHandler', () => {
  let handler: OAuthCreateApplicationClientHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthCreateApplicationClientHandler,
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

    handler = module.get<OAuthCreateApplicationClientHandler>(
      OAuthCreateApplicationClientHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('OAuthCreateApplicationClientHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an applicationClient created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(oAuthMockApplicationClientData[0]),
            ),
        );
      expect(
        await handler.main(oAuthMockApplicationClientData[0], 'Europe/Madrid'),
      ).toBe(oAuthMockApplicationClientData[0]);
    });
  });
});
