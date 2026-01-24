/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthCreateApplicationInput } from '@api/graphql';
import {
  OAuthCreateApplicationHandler,
  OAuthCreateApplicationResolver,
} from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationResolver', () => {
  let resolver: OAuthCreateApplicationResolver;
  let handler: OAuthCreateApplicationHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthCreateApplicationResolver,
        {
          provide: OAuthCreateApplicationHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthCreateApplicationResolver>(
      OAuthCreateApplicationResolver,
    );
    handler = module.get<OAuthCreateApplicationHandler>(
      OAuthCreateApplicationHandler,
    );
  });

  test('OAuthCreateApplicationResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthCreateApplicationResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an application created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockApplicationData[0])),
        );
      expect(
        await resolver.main(
          <OAuthCreateApplicationInput>oAuthMockApplicationData[0],
        ),
      ).toBe(oAuthMockApplicationData[0]);
    });
  });
});
