/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateApplicationByIdResolver } from './o-auth-update-application-by-id.resolver';
import { OAuthUpdateApplicationByIdHandler } from '../handlers/o-auth-update-application-by-id.handler';
import { OAuthUpdateApplicationByIdInput } from '@api/graphql';

// sources
import { applications } from '@app/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthUpdateApplicationByIdResolver', () =>
{
    let resolver: OAuthUpdateApplicationByIdResolver;
    let handler: OAuthUpdateApplicationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationByIdResolver,
                {
                    provide : OAuthUpdateApplicationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateApplicationByIdResolver>(OAuthUpdateApplicationByIdResolver);
        handler = module.get<OAuthUpdateApplicationByIdHandler>(OAuthUpdateApplicationByIdHandler);
    });

    test('OAuthUpdateApplicationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a application by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(<OAuthUpdateApplicationByIdInput>applications[0])).toBe(applications[0]);
        });
    });
});