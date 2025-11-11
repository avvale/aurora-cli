/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthFindApplicationByIdHandler } from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationByIdHandler', () => {
    let handler: OAuthFindApplicationByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthFindApplicationByIdHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<OAuthFindApplicationByIdHandler>(
            OAuthFindApplicationByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('OAuthFindApplicationByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('OAuthFindApplicationByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an application by id', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockApplicationData[0]),
                    ),
            );
            expect(
                await handler.main(
                    oAuthMockApplicationData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(oAuthMockApplicationData[0]);
        });
    });
});
