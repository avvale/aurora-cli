import {
    OAuthApplication,
    OAuthIApplicationRepository,
} from '@app/o-auth/application';
import { OAuthApplicationId } from '@app/o-auth/application/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthFindApplicationByIdService {
    constructor(private readonly repository: OAuthIApplicationRepository) {}

    async main(
        id: OAuthApplicationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthApplication> {
        return await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });
    }
}
