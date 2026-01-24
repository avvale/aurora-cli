/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthFindClientHandler,
  OAuthFindClientResolver,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindClientResolver', () => {
  let resolver: OAuthFindClientResolver;
  let handler: OAuthFindClientHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthFindClientResolver,
        {
          provide: OAuthFindClientHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthFindClientResolver>(OAuthFindClientResolver);
    handler = module.get<OAuthFindClientHandler>(OAuthFindClientHandler);
  });

  test('OAuthFindClientResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthFindClientResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a client', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
        );
      expect(await resolver.main()).toBe(oAuthMockClientData[0]);
    });
  });
});
