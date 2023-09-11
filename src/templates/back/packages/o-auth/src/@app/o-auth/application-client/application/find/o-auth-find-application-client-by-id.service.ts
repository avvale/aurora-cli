import { OAuthApplicationClient, OAuthIApplicationClientRepository } from '@app/o-auth/application-client';
import { OAuthApplicationClientApplicationId, OAuthApplicationClientClientId } from '@app/o-auth/application-client/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindApplicationClientByIdService
{
    constructor(
        private readonly repository: OAuthIApplicationClientRepository,
    ) {}

    async main(
        applicationId: OAuthApplicationClientApplicationId,
        clientId: OAuthApplicationClientClientId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthApplicationClient>
    {
        return await this.repository.findById(
            undefined,
            {
                constraint,
                cQMetadata,
                findArguments: {
                    applicationId: applicationId.value,
                    clientId: clientId.value,
                },
            },
        );
    }
}
