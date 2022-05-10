/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthUpdateApplicationByIdHandler } from './o-auth-update-application-by-id.handler';
import { OAuthUpdateApplicationByIdInput } from '../../../../graphql';

// sources
import { applications } from '@apps/o-auth/application/infrastructure/seeds/application.seed';

describe('OAuthUpdateApplicationByIdHandler', () =>
{
    let handler: OAuthUpdateApplicationByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateApplicationByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler     = module.get<OAuthUpdateApplicationByIdHandler>(OAuthUpdateApplicationByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthUpdateApplicationByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a application updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(applications[0])));
            expect(await handler.main(<OAuthUpdateApplicationByIdInput>applications[0])).toBe(applications[0]);
        });
    });
});