import { IamCreateTagInput, IamTag } from '@api/graphql';
import { IamCreateTagDto, IamTagDto } from '@api/iam/tag';
import { IamCreateTagCommand, IamFindTagByIdQuery } from '@app/iam/tag';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamCreateTagHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreateTagInput | IamCreateTagDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<IamTag | IamTagDto> {
        await this.commandBus.dispatch(
            new IamCreateTagCommand(payload, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return await this.queryBus.ask(
            new IamFindTagByIdQuery(
                payload.id,
                {},
                {
                    timezone,
                },
            ),
        );
    }
}
