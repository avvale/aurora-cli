import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from '@aurora-ts/core';
import { OAuthApplication } from './application.aggregate';
import { ApplicationResponse } from './application.response';
import {
    ApplicationId,
    ApplicationCode,
    ApplicationName,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt,
} from './value-objects';
import { ClientMapper } from '@app/o-auth/client/domain/client.mapper';

export class ApplicationMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param application
     */
    mapModelToAggregate(application: LiteralObject, cQMetadata?: CQMetadata): OAuthApplication
    {
        if (!application) return;

        return this.makeAggregate(application, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param applications
     */
    mapModelsToAggregates(applications: LiteralObject[], cQMetadata?: CQMetadata): OAuthApplication[]
    {
        if (!Array.isArray(applications)) return;

        return applications.map(application => this.makeAggregate(application, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param application
     */
    mapAggregateToResponse(application: OAuthApplication): ApplicationResponse
    {
        return this.makeResponse(application);
    }

    /**
     * Map array of aggregates to array responses
     * @param applications
     */
    mapAggregatesToResponses(applications: OAuthApplication[]): ApplicationResponse[]
    {
        if (!Array.isArray(applications)) return;

        return applications.map(application => this.makeResponse(application));
    }

    private makeAggregate(application: LiteralObject, cQMetadata?: CQMetadata): OAuthApplication
    {
        return OAuthApplication.register(
            new ApplicationId(application.id, { undefinable: true }),
            new ApplicationCode(application.code, { undefinable: true }),
            new ApplicationName(application.name, { undefinable: true }),
            new ApplicationSecret(application.secret, { undefinable: true }),
            new ApplicationIsMaster(application.isMaster, { undefinable: true }),
            new ApplicationClientIds(application.clientIds, { undefinable: true }),
            new ApplicationCreatedAt(application.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new ApplicationUpdatedAt(application.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new ApplicationDeletedAt(application.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new ClientMapper({ eagerLoading: true }).mapModelsToAggregates(application.clients, cQMetadata) : undefined,
        );
    }

    private makeResponse(application: OAuthApplication): ApplicationResponse
    {
        if (!application) return;

        return new ApplicationResponse(
            application.id.value,
            application.code.value,
            application.name.value,
            application.secret.value,
            application.isMaster.value,
            application.clientIds.value,
            application.createdAt.value,
            application.updatedAt.value,
            application.deletedAt.value,
            this.options.eagerLoading ? new ClientMapper({ eagerLoading: true }).mapAggregatesToResponses(application.clients) : undefined,
        );
    }
}