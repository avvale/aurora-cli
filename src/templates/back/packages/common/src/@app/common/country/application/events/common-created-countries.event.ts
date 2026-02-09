/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CommonCreatedCountryEvent } from '@app/common/country';
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreatedCountriesEvent {
  constructor(
    public readonly event: {
      payload: CommonCreatedCountryEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
