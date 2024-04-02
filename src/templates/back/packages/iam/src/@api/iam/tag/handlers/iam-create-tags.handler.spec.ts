import { IamCreateTagsHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTagsHandler', () =>
{
    let handler: IamCreateTagsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTagsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamCreateTagsHandler>(IamCreateTagsHandler);
    });

    describe('main', () =>
    {
        test('IamCreateTagsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an iamMockTagData created', async () =>
        {
            expect(await handler.main(iamMockTagData)).toBe(true);
        });
    });
});
