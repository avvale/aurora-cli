/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteApplicationByIdResolver } from './o-auth-delete-application-by-id.resolver';
import { OAuthDeleteApplicationByIdHandler } from '../handlers/o-auth-delete-application-by-id.handler';

// sources
import { applications } from '@app/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthDeleteApplicationByIdResolver', () =>
{
    let resolver: OAuthDeleteApplicationByIdResolver;
    let handler: OAuthDeleteApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteApplicationByIdResolver,
                {
                    provide : OAuthDeleteApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthDeleteApplicationByIdResolver>(OAuthDeleteApplicationByIdResolver);
        handler = module.get<OAuthDeleteApplicationByIdHandler>(OAuthDeleteApplicationByIdHandler);
    });

    test('OAuthDeleteApplicationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteApplicationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(applications[0].id)).toBe(applications[0]);
        });
    });
});