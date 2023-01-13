/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateApplicationsResolver } from './o-auth-update-applications.resolver';
import { OAuthUpdateApplicationsHandler } from '../handlers/o-auth-update-applications.handler';
import { OAuthUpdateApplicationsInput } from '@api/graphql';

// sources
import { applications } from '@app/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthUpdateApplicationsResolver', () =>
{
    let resolver: OAuthUpdateApplicationsResolver;
    let handler: OAuthUpdateApplicationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationsResolver,
                {
                    provide : OAuthUpdateApplicationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateApplicationsResolver>(OAuthUpdateApplicationsResolver);
        handler = module.get<OAuthUpdateApplicationsHandler>(OAuthUpdateApplicationsHandler);
    });

    test('OAuthUpdateApplicationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a applications updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(<OAuthUpdateApplicationsInput>applications[0])).toBe(applications[0]);
        });
    });
});