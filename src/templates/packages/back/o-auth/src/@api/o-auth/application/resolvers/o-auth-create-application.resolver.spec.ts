/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateApplicationResolver } from './o-auth-create-application.resolver';
import { OAuthCreateApplicationHandler } from '../handlers/o-auth-create-application.handler';
import { OAuthCreateApplicationInput } from '../../../../graphql';

// sources
import { applications } from '@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthCreateApplicationResolver', () =>
{
    let resolver: OAuthCreateApplicationResolver;
    let handler: OAuthCreateApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthCreateApplicationResolver,
                {
                    provide : OAuthCreateApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthCreateApplicationResolver>(OAuthCreateApplicationResolver);
        handler = module.get<OAuthCreateApplicationHandler>(OAuthCreateApplicationHandler);
    });

    test('OAuthCreateApplicationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateApplicationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(<OAuthCreateApplicationInput>applications[0])).toBe(applications[0]);
        });
    });
});