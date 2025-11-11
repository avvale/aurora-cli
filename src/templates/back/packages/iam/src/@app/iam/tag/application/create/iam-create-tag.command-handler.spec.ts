import { IamCreateTagCommand, iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';
import { IamCreateTagCommandHandler } from './iam-create-tag.command-handler';
import { IamCreateTagService } from './iam-create-tag.service';

describe('IamCreateTagCommandHandler', () => {
    let commandHandler: IamCreateTagCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTagCommandHandler,
                {
                    provide: IamCreateTagService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamCreateTagCommandHandler>(
            IamCreateTagCommandHandler,
        );
    });

    describe('main', () => {
        test('CreateTagCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the IamCreateTagService', async () => {
            expect(
                await commandHandler.execute(
                    new IamCreateTagCommand(
                        {
                            id: iamMockTagData[0].id,
                            rowId: iamMockTagData[0].rowId,
                            name: iamMockTagData[0].name,
                        },
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
