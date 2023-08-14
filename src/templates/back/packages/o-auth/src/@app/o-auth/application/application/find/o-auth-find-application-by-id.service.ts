import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { OAuthIApplicationRepository } from '../../domain/o-auth-application.repository';
import { OAuthApplication } from '../../domain/o-auth-application.aggregate';
import { OAuthApplicationId } from '../../domain/value-objects';

@Injectable()
export class OAuthFindApplicationByIdService
{
    constructor(
        private readonly repository: OAuthIApplicationRepository,
    ) {}

    async main(
        id: OAuthApplicationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<OAuthApplication>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
