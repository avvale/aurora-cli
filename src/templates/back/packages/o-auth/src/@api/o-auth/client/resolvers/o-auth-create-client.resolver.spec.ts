/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthCreateClientInput } from '@api/graphql';
import {
  OAuthCreateClientHandler,
  OAuthCreateClientResolver,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateClientResolver', () => {
  let resolver: OAuthCreateClientResolver;
  let handler: OAuthCreateClientHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthCreateClientResolver,
        {
          provide: OAuthCreateClientHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthCreateClientResolver>(OAuthCreateClientResolver);
    handler = module.get<OAuthCreateClientHandler>(OAuthCreateClientHandler);
  });

  test('OAuthCreateClientResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthCreateClientResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an client created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
        );
      expect(
        await resolver.main(<OAuthCreateClientInput>oAuthMockClientData[0]),
      ).toBe(oAuthMockClientData[0]);
    });
  });
});
