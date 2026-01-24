/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthDeleteApplicationClientByIdHandler,
  OAuthDeleteApplicationClientByIdResolver,
} from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationClientByIdResolver', () => {
  let resolver: OAuthDeleteApplicationClientByIdResolver;
  let handler: OAuthDeleteApplicationClientByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthDeleteApplicationClientByIdResolver,
        {
          provide: OAuthDeleteApplicationClientByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthDeleteApplicationClientByIdResolver>(
      OAuthDeleteApplicationClientByIdResolver,
    );
    handler = module.get<OAuthDeleteApplicationClientByIdHandler>(
      OAuthDeleteApplicationClientByIdHandler,
    );
  });

  test('OAuthDeleteApplicationClientByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthDeleteApplicationClientByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an applicationClient deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(oAuthMockApplicationClientData[0]),
            ),
        );
      expect(await resolver.main(oAuthMockApplicationClientData[0].id)).toBe(
        oAuthMockApplicationClientData[0],
      );
    });
  });
});
