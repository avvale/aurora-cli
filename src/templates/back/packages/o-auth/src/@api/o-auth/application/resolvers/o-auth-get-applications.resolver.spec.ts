/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OAuthGetApplicationsHandler,
  OAuthGetApplicationsResolver,
} from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetApplicationsResolver', () => {
  let resolver: OAuthGetApplicationsResolver;
  let handler: OAuthGetApplicationsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OAuthGetApplicationsResolver,
        {
          provide: OAuthGetApplicationsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthGetApplicationsResolver>(
      OAuthGetApplicationsResolver,
    );
    handler = module.get<OAuthGetApplicationsHandler>(
      OAuthGetApplicationsHandler,
    );
  });

  test('OAuthGetApplicationsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthGetApplicationsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a oAuthMockApplicationData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(oAuthMockApplicationData)),
        );
      expect(await resolver.main()).toBe(oAuthMockApplicationData);
    });
  });
});
