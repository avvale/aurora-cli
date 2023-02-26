/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpsertApplicationResolver } from './o-auth-upsert-application.resolver';
import { OAuthUpsertApplicationHandler } from '../handlers/o-auth-upsert-application.handler';
import { OAuthUpdateApplicationByIdInput } from '@api/graphql';

// sources
import { applications } from '@app/o-auth/application/infrastructure/mock/mock-application.data';

describe('OAuthUpsertApplicationResolver', () =>
{
    let resolver: OAuthUpsertApplicationResolver;
    let handler: OAuthUpsertApplicationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpsertApplicationResolver,
                {
                    provide : OAuthUpsertApplicationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpsertApplicationResolver>(OAuthUpsertApplicationResolver);
        handler = module.get<OAuthUpsertApplicationHandler>(OAuthUpsertApplicationHandler);
    });

    test('OAuthUpsertApplicationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpsertApplicationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an application upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await resolver.main(<OAuthUpdateApplicationByIdInput>applications[0])).toBe(applications[0]);
        });
    });
});