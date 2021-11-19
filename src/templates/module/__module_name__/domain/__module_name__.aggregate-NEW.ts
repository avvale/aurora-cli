/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectLiteral, Utils } from 'aurora-ts-core';
import {
    {% for valueObject in (schema.properties.valueObjects | allowI18nProperty) %}
    {{ schema.moduleName | pascalCase }}{{ valueObject.name | pascalCase }},
    {% endfor %}
} from './value-objects';