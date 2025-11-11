import {
    ToolsCreatedProcedureEvent,
    ToolsCreatedProceduresEvent,
    ToolsDeletedProcedureEvent,
    ToolsDeletedProceduresEvent,
    ToolsProcedure,
    ToolsUpdatedProcedureEvent,
    ToolsUpdatedProceduresEvent,
} from '@app/tools/procedure';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class ToolsAddProceduresContextEvent extends AggregateRoot {
    constructor(
        public readonly aggregateRoots: ToolsProcedure[] = [],
        public readonly cQMetadata?: CQMetadata,
    ) {
        super();
    }

    *[Symbol.iterator]() {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void {
        this.apply(
            new ToolsCreatedProceduresEvent({
                payload: this.aggregateRoots.map(
                    (procedure) =>
                        new ToolsCreatedProcedureEvent({
                            payload: {
                                id: procedure.id.value,
                                name: procedure.name.value,
                                type: procedure.type.value,
                                version: procedure.version.value,
                                isActive: procedure.isActive.value,
                                isExecuted: procedure.isExecuted.value,
                                isUpdated: procedure.isUpdated.value,
                                upScript: procedure.upScript?.value,
                                downScript: procedure.downScript?.value,
                                sort: procedure.sort?.value,
                                hash: procedure.hash?.value,
                                executedAt: procedure.executedAt?.value,
                                checkedAt: procedure.checkedAt?.value,
                                createdAt: procedure.createdAt?.value,
                                updatedAt: procedure.updatedAt?.value,
                                deletedAt: procedure.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updated(): void {
        this.apply(
            new ToolsUpdatedProceduresEvent({
                payload: this.aggregateRoots.map(
                    (procedure) =>
                        new ToolsUpdatedProcedureEvent({
                            payload: {
                                id: procedure.id.value,
                                name: procedure.name.value,
                                type: procedure.type.value,
                                version: procedure.version.value,
                                isActive: procedure.isActive.value,
                                isExecuted: procedure.isExecuted.value,
                                isUpdated: procedure.isUpdated.value,
                                upScript: procedure.upScript?.value,
                                downScript: procedure.downScript?.value,
                                sort: procedure.sort?.value,
                                hash: procedure.hash?.value,
                                executedAt: procedure.executedAt?.value,
                                checkedAt: procedure.checkedAt?.value,
                                createdAt: procedure.createdAt?.value,
                                updatedAt: procedure.updatedAt?.value,
                                deletedAt: procedure.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    deleted(): void {
        this.apply(
            new ToolsDeletedProceduresEvent({
                payload: this.aggregateRoots.map(
                    (procedure) =>
                        new ToolsDeletedProcedureEvent({
                            payload: {
                                id: procedure.id.value,
                                rowId: procedure.rowId.value,
                                name: procedure.name.value,
                                type: procedure.type.value,
                                version: procedure.version.value,
                                isActive: procedure.isActive.value,
                                isExecuted: procedure.isExecuted.value,
                                isUpdated: procedure.isUpdated.value,
                                upScript: procedure.upScript?.value,
                                downScript: procedure.downScript?.value,
                                sort: procedure.sort?.value,
                                hash: procedure.hash?.value,
                                executedAt: procedure.executedAt?.value,
                                checkedAt: procedure.checkedAt?.value,
                                createdAt: procedure.createdAt?.value,
                                updatedAt: procedure.updatedAt?.value,
                                deletedAt: procedure.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
