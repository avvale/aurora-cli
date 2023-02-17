import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SideEffectResponse } from '../../domain/side-effect.response';
import { SideEffectMapper } from '../../domain/side-effect.mapper';
import { RawSQLSideEffectsQuery } from './raw-sql-side-effects.query';
import { RawSQLSideEffectsService } from './raw-sql-side-effects.service';

@QueryHandler(RawSQLSideEffectsQuery)
export class RawSQLSideEffectsQueryHandler implements IQueryHandler<RawSQLSideEffectsQuery>
{
    private readonly mapper: SideEffectMapper = new SideEffectMapper();

    constructor(
        private readonly rawSQLSideEffectsService: RawSQLSideEffectsService,
    ) {}

    async execute(query: RawSQLSideEffectsQuery): Promise<SideEffectResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLSideEffectsService.main(query.rawSQL, query.cQMetadata));
    }
}