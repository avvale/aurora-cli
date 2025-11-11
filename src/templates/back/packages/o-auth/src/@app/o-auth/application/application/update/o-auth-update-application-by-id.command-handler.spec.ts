import {
    oAuthMockApplicationData,
    OAuthUpdateApplicationByIdCommand,
} from '@app/o-auth/application';
import { OAuthUpdateApplicationByIdCommandHandler } from '@app/o-auth/application/application/update/o-auth-update-application-by-id.command-handler';
import { OAuthUpdateApplicationByIdService } from '@app/o-auth/application/application/update/o-auth-update-application-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationByIdCommandHandler', () => {
    let commandHandler: OAuthUpdateApplicationByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthUpdateApplicationByIdCommandHandler,
                {
                    provide: OAuthUpdateApplicationByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<OAuthUpdateApplicationByIdCommandHandler>(
            OAuthUpdateApplicationByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateApplicationByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an application created', async () => {
            expect(
                await commandHandler.execute(
                    new OAuthUpdateApplicationByIdCommand(
                        {
                            id: oAuthMockApplicationData[0].id,
                            rowId: oAuthMockApplicationData[0].rowId,
                            code: oAuthMockApplicationData[0].code,
                            name: oAuthMockApplicationData[0].name,
                            secret: oAuthMockApplicationData[0].secret,
                            isMaster: oAuthMockApplicationData[0].isMaster,
                            clientIds: oAuthMockApplicationData[0].clientIds,
                        },
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
