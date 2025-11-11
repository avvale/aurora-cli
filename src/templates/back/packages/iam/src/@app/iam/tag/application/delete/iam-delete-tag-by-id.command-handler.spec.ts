import { IamDeleteTagByIdCommand, iamMockTagData } from '@app/iam/tag';
import { IamDeleteTagByIdCommandHandler } from '@app/iam/tag/application/delete/iam-delete-tag-by-id.command-handler';
import { IamDeleteTagByIdService } from '@app/iam/tag/application/delete/iam-delete-tag-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTagByIdCommandHandler', () => {
    let commandHandler: IamDeleteTagByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteTagByIdCommandHandler,
                {
                    provide: IamDeleteTagByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamDeleteTagByIdCommandHandler>(
            IamDeleteTagByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('IamDeleteTagByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteTagByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new IamDeleteTagByIdCommand(iamMockTagData[0].id),
                ),
            ).toBe(undefined);
        });
    });
});
