import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateApplicationsResolver } from './o-auth-create-applications.resolver';
import { OAuthCreateApplicationsHandler } from '../handlers/o-auth-create-applications.handler';
import { OAuthCreateApplicationInput } from '../../../../graphql';

// sources
import { applications } from '../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthCreateApplicationsResolver', () =>
{
    let resolver: OAuthCreateApplicationsResolver;
    let handler: OAuthCreateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateApplicationsResolver,
                {
                    provide : OAuthCreateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthCreateApplicationsResolver>(OAuthCreateApplicationsResolver);
        handler = module.get<OAuthCreateApplicationsHandler>(OAuthCreateApplicationsHandler);
    });

    test('OAuthCreateApplicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateApplicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an applications created', async () =>
        {
            expect(await resolver.main(<OAuthCreateApplicationInput[]>applications)).toBe(undefined);
        });
    });
});