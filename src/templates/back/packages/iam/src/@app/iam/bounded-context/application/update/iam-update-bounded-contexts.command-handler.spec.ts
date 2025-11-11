import {
    iamMockBoundedContextData,
    IamUpdateBoundedContextsCommand,
} from '@app/iam/bounded-context';
import { IamUpdateBoundedContextsCommandHandler } from '@app/iam/bounded-context/application/update/iam-update-bounded-contexts.command-handler';
import { IamUpdateBoundedContextsService } from '@app/iam/bounded-context/application/update/iam-update-bounded-contexts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateBoundedContextsCommandHandler', () => {
    let commandHandler: IamUpdateBoundedContextsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateBoundedContextsCommandHandler,
                {
                    provide: IamUpdateBoundedContextsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamUpdateBoundedContextsCommandHandler>(
            IamUpdateBoundedContextsCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateBoundedContextsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an boundedContexts updated', async () => {
            expect(
                await commandHandler.execute(
                    new IamUpdateBoundedContextsCommand(
                        {
                            id: iamMockBoundedContextData[0].id,
                            rowId: iamMockBoundedContextData[0].rowId,
                            name: iamMockBoundedContextData[0].name,
                            root: iamMockBoundedContextData[0].root,
                            sort: iamMockBoundedContextData[0].sort,
                            isActive: iamMockBoundedContextData[0].isActive,
                        },
                        {},
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
