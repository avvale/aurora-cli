/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindApplicationByIdResolver } from './o-auth-find-application-by-id.resolver';
import { OAuthFindApplicationByIdHandler } from '../handlers/o-auth-find-application-by-id.handler';

// sources
import { applications } from '@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthFindApplicationByIdResolver', () =>
{
    let resolver: OAuthFindApplicationByIdResolver;
    let handler: OAuthFindApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindApplicationByIdResolver,
                {
                    provide : OAuthFindApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindApplicationByIdResolver>(OAuthFindApplicationByIdResolver);
        handler = module.get<OAuthFindApplicationByIdHandler>(OAuthFindApplicationByIdHandler);
    });

    test('OAuthFindApplicationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindApplicationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(applications[0].id)).toBe(applications[0]);
        });
    });
});