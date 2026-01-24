import { CommonCountry, CommonICountryRepository } from '@app/common/country';
import { CommonCountryId } from '@app/common/country/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindCountryByIdService {
  constructor(private readonly repository: CommonICountryRepository) {}

  async main(
    id: CommonCountryId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonCountry> {
    return await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });
  }
}
