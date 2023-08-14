/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthUpdateApplicationByIdCommand } from './o-auth-update-application-by-id.command';
import { OAuthUpdateApplicationByIdService } from './o-auth-update-application-by-id.service';
import {
    OAuthApplicationId,
    OAuthApplicationCode,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationIsMaster,
    OAuthApplicationClientIds,
    OAuthApplicationCreatedAt,
    OAuthApplicationUpdatedAt,
    OAuthApplicationDeletedAt,
} from '../../domain/value-objects';

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
