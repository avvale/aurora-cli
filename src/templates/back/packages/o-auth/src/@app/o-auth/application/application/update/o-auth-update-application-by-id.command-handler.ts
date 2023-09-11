/* eslint-disable key-spacing */
import { OAuthUpdateApplicationByIdCommand } from '@app/o-auth/application';
import { OAuthUpdateApplicationByIdService } from '@app/o-auth/application/application/update/o-auth-update-application-by-id.service';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationSecret,
} from '@app/o-auth/application/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateApplicationByIdCommand)
export class OAuthUpdateApplicationByIdCommandHandler implements ICommandHandler<OAuthUpdateApplicationByIdCommand>
{
    constructor(
        private readonly updateApplicationByIdService: OAuthUpdateApplicationByIdService,
    ) {}

    async execute(command: OAuthUpdateApplicationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationByIdService.main(
            {
                id: new OAuthApplicationId(command.payload.id),
                code: new OAuthApplicationCode(command.payload.code, { undefinable: true }),
                name: new OAuthApplicationName(command.payload.name, { undefinable: true }),
                secret: new OAuthApplicationSecret(command.payload.secret, { undefinable: true }),
                isMaster: new OAuthApplicationIsMaster(command.payload.isMaster, { undefinable: true }),
                clientIds: new OAuthApplicationClientIds(command.payload.clientIds),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}
