/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateApplicationResolver } from './o-auth-update-application.resolver';
import { OAuthUpdateApplicationHandler } from '../handlers/o-auth-update-application.handler';
import { OAuthUpdateApplicationInput } from '../../../../graphql';

// sources
import { applications } from '@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthUpdateApplicationResolver', () =>
{
    let resolver: OAuthUpdateApplicationResolver;
    let handler: OAuthUpdateApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationResolver,
                {
                    provide : OAuthUpdateApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateApplicationResolver>(OAuthUpdateApplicationResolver);
        handler = module.get<OAuthUpdateApplicationHandler>(OAuthUpdateApplicationHandler);
    });

    test('OAuthUpdateApplicationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a application created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(<OAuthUpdateApplicationInput>applications[0])).toBe(applications[0]);
        });
    });
});