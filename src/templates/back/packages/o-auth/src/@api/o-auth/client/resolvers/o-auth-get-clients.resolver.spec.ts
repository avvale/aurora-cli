/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthGetClientsHandler,
  OAuthGetClientsResolver,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetClientsResolver', () => {
  let resolver: OAuthGetClientsResolver;
  let handler: OAuthGetClientsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthGetClientsResolver,
        {
          provide: OAuthGetClientsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthGetClientsResolver>(OAuthGetClientsResolver);
    handler = module.get<OAuthGetClientsHandler>(OAuthGetClientsHandler);
  });

  test('OAuthGetClientsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthGetClientsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a oAuthMockClientData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockClientData)),
        );
      expect(await resolver.main()).toBe(oAuthMockClientData);
    });
  });
});
