/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateClientByIdInput } from '@api/graphql';
import {
  OAuthUpdateClientByIdHandler,
  OAuthUpdateClientByIdResolver,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateClientByIdResolver', () => {
  let resolver: OAuthUpdateClientByIdResolver;
  let handler: OAuthUpdateClientByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthUpdateClientByIdResolver,
        {
          provide: OAuthUpdateClientByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthUpdateClientByIdResolver>(
      OAuthUpdateClientByIdResolver,
    );
    handler = module.get<OAuthUpdateClientByIdHandler>(
      OAuthUpdateClientByIdHandler,
    );
  });

  test('OAuthUpdateClientByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthUpdateClientByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a client by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
        );
      expect(
        await resolver.main(<OAuthUpdateClientByIdInput>oAuthMockClientData[0]),
      ).toBe(oAuthMockClientData[0]);
    });
  });
});
