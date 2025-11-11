import {
    IamDeleteBoundedContextByIdCommand,
    iamMockBoundedContextData,
} from '@app/iam/bounded-context';
import { IamDeleteBoundedContextByIdCommandHandler } from '@app/iam/bounded-context/application/delete/iam-delete-bounded-context-by-id.command-handler';
import { IamDeleteBoundedContextByIdService } from '@app/iam/bounded-context/application/delete/iam-delete-bounded-context-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteBoundedContextByIdCommandHandler', () => {
    let commandHandler: IamDeleteBoundedContextByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteBoundedContextByIdCommandHandler,
                {
                    provide: IamDeleteBoundedContextByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamDeleteBoundedContextByIdCommandHandler>(
            IamDeleteBoundedContextByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('IamDeleteBoundedContextByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteBoundedContextByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new IamDeleteBoundedContextByIdCommand(
                        iamMockBoundedContextData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
