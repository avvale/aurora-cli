import { OAuthCreateApplicationClientInput } from '@api/graphql';
import {
  OAuthCreateApplicationsClientsHandler,
  OAuthCreateApplicationsClientsResolver,
} from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationsClientsResolver', () => {
  let resolver: OAuthCreateApplicationsClientsResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthCreateApplicationsClientsResolver,
        {
          provide: OAuthCreateApplicationsClientsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<OAuthCreateApplicationsClientsResolver>(
      OAuthCreateApplicationsClientsResolver,
    );
  });

  test('OAuthCreateApplicationsClientsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('OAuthCreateApplicationsClientsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an applicationsClients created', async () => {
      expect(
        await resolver.main(
          <OAuthCreateApplicationClientInput[]>oAuthMockApplicationClientData,
        ),
      ).toBe(undefined);
    });
  });
});
