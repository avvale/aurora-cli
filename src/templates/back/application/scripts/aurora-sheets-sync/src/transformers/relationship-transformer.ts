import { AuroraProperty, AuroraRelationship } from '../types';

/**
 * Checks if a property has a many-to-many relationship with a pivot
 */
export function hasPivotRelationship(property: AuroraProperty): boolean {
  return (
    property.relationship?.type === 'many-to-many' &&
    property.relationship.pivot !== undefined
  );
}

/**
 * Extract pivot data from a property's many-to-many relationship
 */
export function extractPivotFromProperty(property: AuroraProperty): {
  pivotName: string;
  relationship: AuroraRelationship;
} | null {
  if (!hasPivotRelationship(property)) {
    return null;
  }

  const relationship = property.relationship!;
  const pivotName = relationship.pivot!.moduleName;

  return {
    pivotName,
    relationship,
  };
}

/**
 * Separates regular properties from pivot-containing properties
 */
export function separatePropertiesAndPivots(properties: AuroraProperty[]): {
  regularProperties: AuroraProperty[];
  pivotProperties: AuroraProperty[];
} {
  const regularProperties: AuroraProperty[] = [];
  const pivotProperties: AuroraProperty[] = [];

  for (const prop of properties) {
    if (hasPivotRelationship(prop)) {
      pivotProperties.push(prop);
    } else {
      regularProperties.push(prop);
    }
  }

  return { regularProperties, pivotProperties };
}

/**
 * Creates a simplified property (without pivot data) for the main properties section
 * The relationship reference is kept, but pivot details are removed
 */
export function createPropertyWithoutPivot(
  property: AuroraProperty,
): AuroraProperty {
  if (!hasPivotRelationship(property)) {
    return property;
  }

  // Create a copy without the pivot data
  const simplified: AuroraProperty = {
    ...property,
  };

  if (simplified.relationship) {
    simplified.relationship = {
      type: simplified.relationship.type,
      singularName: simplified.relationship.singularName,
      aggregateName: simplified.relationship.aggregateName,
      modulePath: simplified.relationship.modulePath,
      avoidConstraint: simplified.relationship.avoidConstraint,
      // pivot is intentionally omitted - it will be in a separate section
    };
  }

  return simplified;
}

/**
 * Formats relationship type for display
 */
export function formatRelationshipType(type?: string): string {
  if (!type) return '';
  const typeMap: Record<string, string> = {
    'one-to-one': '1:1',
    'many-to-one': 'N:1',
    'one-to-many': '1:N',
    'many-to-many': 'N:M',
  };
  return typeMap[type] || type;
}

/**
 * Parse relationship type from display format
 */
export function parseRelationshipType(
  display: string,
): AuroraRelationship['type'] | undefined {
  const typeMap: Record<string, AuroraRelationship['type']> = {
    '1:1': 'one-to-one',
    'N:1': 'many-to-one',
    '1:N': 'one-to-many',
    'N:M': 'many-to-many',
    'one-to-one': 'one-to-one',
    'many-to-one': 'many-to-one',
    'one-to-many': 'one-to-many',
    'many-to-many': 'many-to-many',
  };
  return typeMap[display];
}

/**
 * Collect all unique pivot tables from properties
 */
export function collectUniquePivots(
  properties: AuroraProperty[],
): Map<string, AuroraProperty> {
  const pivots = new Map<string, AuroraProperty>();

  for (const prop of properties) {
    if (hasPivotRelationship(prop)) {
      const pivotName = prop.relationship!.pivot!.moduleName;
      // Use first occurrence if duplicate pivot names
      if (!pivots.has(pivotName)) {
        pivots.set(pivotName, prop);
      }
    }
  }

  return pivots;
}
