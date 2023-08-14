import { RelationshipType } from '../types';
import { Property } from './property';

export const getNameProperty = (property: Property): string =>
{
    // properties that represent many to many relationships, are arrays of ids
    if (property.relationship?.type === RelationshipType.MANY_TO_MANY) return `${property.relationship.singularName}Ids`;
    return property.name;
};
