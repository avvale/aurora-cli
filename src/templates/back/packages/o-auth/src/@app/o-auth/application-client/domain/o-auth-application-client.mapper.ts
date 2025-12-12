import { OAuthApplicationMapper } from '@app/o-auth/application';
import {
    OAuthApplicationClient,
    OAuthApplicationClientResponse,
} from '@app/o-auth/application-client';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { OAuthClientMapper } from '@app/o-auth/client';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class OAuthApplicationClientMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param applicationClient
     */
    mapModelToAggregate(
        applicationClient: LiteralObject,
        cQMetadata?: CQMetadata,
    ): OAuthApplicationClient {
        if (!applicationClient) return;

        return this.makeAggregate(applicationClient, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param applicationsClients
     */
    mapModelsToAggregates(
        applicationsClients: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): OAuthApplicationClient[] {
        if (!Array.isArray(applicationsClients)) return;

        return applicationsClients.map((applicationClient) =>
            this.makeAggregate(applicationClient, cQMetadata),
        );
    }

    /**
     * Map aggregate to response
     * @param applicationClient
     */
    mapAggregateToResponse(
        applicationClient: OAuthApplicationClient,
    ): OAuthApplicationClientResponse {
        return this.makeResponse(applicationClient);
    }

    /**
     * Map array of aggregates to array responses
     * @param applicationsClients
     */
    mapAggregatesToResponses(
        applicationsClients: OAuthApplicationClient[],
    ): OAuthApplicationClientResponse[] {
        if (!Array.isArray(applicationsClients)) return;

        return applicationsClients.map((applicationClient) =>
            this.makeResponse(applicationClient),
        );
    }

    private makeAggregate(
        applicationClient: LiteralObject,
        cQMetadata?: CQMetadata,
    ): OAuthApplicationClient {
        return OAuthApplicationClient.register(
            new OAuthApplicationClientApplicationId(
                applicationClient.applicationId,
                { undefinable: true },
            ),
            new OAuthApplicationClientClientId(applicationClient.clientId, {
                undefinable: true,
            }),
            this.options.eagerLoading
                ? new OAuthApplicationMapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(
                      applicationClient.application,
                      cQMetadata,
                  )
                : undefined,
            this.options.eagerLoading
                ? new OAuthClientMapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(applicationClient.client, cQMetadata)
                : undefined,
        );
    }

    private makeResponse(
        applicationClient: OAuthApplicationClient,
    ): OAuthApplicationClientResponse {
        if (!applicationClient) return null;

        return new OAuthApplicationClientResponse(
            applicationClient.applicationId.value,
            applicationClient.clientId.value,
            this.options.eagerLoading
                ? new OAuthApplicationMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(applicationClient.application)
                : undefined,
            this.options.eagerLoading
                ? new OAuthClientMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(applicationClient.client)
                : undefined,
        );
    }
}
