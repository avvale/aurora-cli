/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindApplicationResolver } from './o-auth-find-application.resolver';
import { OAuthFindApplicationHandler } from '../handlers/o-auth-find-application.handler';

// sources
import { applications } from '@app/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthFindApplicationResolver', () =>
{
    let resolver: OAuthFindApplicationResolver;
    let handler: OAuthFindApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindApplicationResolver,
                {
                    provide : OAuthFindApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindApplicationResolver>(OAuthFindApplicationResolver);
        handler = module.get<OAuthFindApplicationHandler>(OAuthFindApplicationHandler);
    });

    test('OAuthFindApplicationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a application', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main()).toBe(applications[0]);
        });
    });
});