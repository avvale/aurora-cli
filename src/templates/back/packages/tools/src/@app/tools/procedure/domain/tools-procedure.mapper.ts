import { ToolsProcedure, ToolsProcedureResponse } from '@app/tools/procedure';
import {
    ToolsProcedureCheckedAt,
    ToolsProcedureCreatedAt,
    ToolsProcedureDeletedAt,
    ToolsProcedureDownScript,
    ToolsProcedureExecutedAt,
    ToolsProcedureHash,
    ToolsProcedureId,
    ToolsProcedureIsActive,
    ToolsProcedureIsExecuted,
    ToolsProcedureIsUpdated,
    ToolsProcedureName,
    ToolsProcedureRowId,
    ToolsProcedureSort,
    ToolsProcedureType,
    ToolsProcedureUpdatedAt,
    ToolsProcedureUpScript,
    ToolsProcedureVersion,
} from '@app/tools/procedure/domain/value-objects';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class ToolsProcedureMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param procedure
     */
    mapModelToAggregate(
        procedure: LiteralObject,
        cQMetadata?: CQMetadata,
    ): ToolsProcedure {
        if (!procedure) return;

        return this.makeAggregate(procedure, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param procedures
     */
    mapModelsToAggregates(
        procedures: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): ToolsProcedure[] {
        if (!Array.isArray(procedures)) return;

        return procedures.map((procedure) =>
            this.makeAggregate(procedure, cQMetadata),
        );
    }

    /**
     * Map aggregate to response
     * @param procedure
     */
    mapAggregateToResponse(procedure: ToolsProcedure): ToolsProcedureResponse {
        return this.makeResponse(procedure);
    }

    /**
     * Map array of aggregates to array responses
     * @param procedures
     */
    mapAggregatesToResponses(
        procedures: ToolsProcedure[],
    ): ToolsProcedureResponse[] {
        if (!Array.isArray(procedures)) return;

        return procedures.map((procedure) => this.makeResponse(procedure));
    }

    private makeAggregate(
        procedure: LiteralObject,
        cQMetadata?: CQMetadata,
    ): ToolsProcedure {
        return ToolsProcedure.register(
            new ToolsProcedureId(procedure.id, { undefinable: true }),
            new ToolsProcedureRowId(procedure.rowId, { undefinable: true }),
            new ToolsProcedureName(procedure.name, { undefinable: true }),
            new ToolsProcedureType(procedure.type, { undefinable: true }),
            new ToolsProcedureVersion(procedure.version, { undefinable: true }),
            new ToolsProcedureIsActive(procedure.isActive, {
                undefinable: true,
            }),
            new ToolsProcedureIsExecuted(procedure.isExecuted, {
                undefinable: true,
            }),
            new ToolsProcedureIsUpdated(procedure.isUpdated, {
                undefinable: true,
            }),
            new ToolsProcedureUpScript(procedure.upScript, {
                undefinable: true,
            }),
            new ToolsProcedureDownScript(procedure.downScript, {
                undefinable: true,
            }),
            new ToolsProcedureSort(procedure.sort, { undefinable: true }),
            new ToolsProcedureHash(procedure.hash, { undefinable: true }),
            new ToolsProcedureExecutedAt(
                procedure.executedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new ToolsProcedureCheckedAt(
                procedure.checkedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new ToolsProcedureCreatedAt(
                procedure.createdAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new ToolsProcedureUpdatedAt(
                procedure.updatedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new ToolsProcedureDeletedAt(
                procedure.deletedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
        );
    }

    private makeResponse(procedure: ToolsProcedure): ToolsProcedureResponse {
        if (!procedure) return null;

        return new ToolsProcedureResponse(
            procedure.id.value,
            procedure.rowId.value,
            procedure.name.value,
            procedure.type.value,
            procedure.version.value,
            procedure.isActive.value,
            procedure.isExecuted.value,
            procedure.isUpdated.value,
            procedure.upScript.value,
            procedure.downScript.value,
            procedure.sort.value,
            procedure.hash.value,
            procedure.executedAt.value,
            procedure.checkedAt.value,
            procedure.createdAt.value,
            procedure.updatedAt.value,
            procedure.deletedAt.value,
        );
    }
}
