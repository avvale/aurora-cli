/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Aurora } from '@aurorajs.dev/core';
import { Field, Schema } from '@aurorajs.dev/typesense';
import { Injectable } from '@nestjs/common';

@Aurora({
  boundedContextName: 'common',
  moduleName: 'lang',
  moduleNames: 'langs',
})
@Schema()
@Injectable()
export class CommonLangSchema {
  @Field('string')
  id: string;

  @Field('string')
  name: string;

  @Field('string')
  iso6392: string;

  @Field('string')
  iso6393: string;
}
