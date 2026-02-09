/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-3.aurora.yaml
 */
import { CommonAdministrativeAreaLevel1Dto } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Dto } from '@api/common/administrative-area-level-2';
import { CommonCountryDto } from '@api/common/country';
import {
  CommonAdministrativeAreaLevel1MapType,
  CommonAdministrativeAreaLevel3MapType,
} from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class CommonAdministrativeAreaLevel3Dto {
  @ApiProperty({
    type: String,
    description:
      'Unique identifier for the administrative area level 3. UUID v4 format, generated automatically on creation.',
  })
  id: string;

  @ApiProperty({
    type: Number,
    description:
      'Auto-incrementing sequential identifier for the administrative area level 3. Used for internal ordering, human-readable reference numbers, and optimized queries. Not exposed in external APIs. Provides a stable, predictable identifier for database operations.',
  })
  rowId: number;

  @ApiProperty({
    type: String,
    description:
      'Foreign key to the country this administrative area belongs to. Denormalized from level 1 for efficient querying without joins.',
    example: 'f117d0ca-6c95-5bdd-9e9d-ffa16c621e74',
  })
  countryId: string;

  @ApiProperty({
    type: () => CommonCountryDto,
    description: 'CommonCountry [input here api field description]',
  })
  country?: CommonCountryDto;

  @ApiProperty({
    type: String,
    description:
      'Foreign key to the administrative area level 1. Denormalized from level 2 for efficient querying without joins. Establishes top-level hierarchy.',
    example: '018e2f70-60e0-5606-89d2-9380ed78e8ff',
  })
  administrativeAreaLevel1Id: string;

  @ApiProperty({
    type: () => CommonAdministrativeAreaLevel1Dto,
    description:
      'CommonAdministrativeAreaLevel1 [input here api field description]',
  })
  administrativeAreaLevel1?: CommonAdministrativeAreaLevel1Dto;

  @ApiProperty({
    type: String,
    description:
      'Foreign key to the parent administrative area level 2. Establishes direct hierarchical relationship (e.g., city belongs to county).',
    example: 'c77e1c2d-0807-59c9-98e9-337d6ca40b95',
  })
  administrativeAreaLevel2Id: string;

  @ApiProperty({
    type: () => CommonAdministrativeAreaLevel2Dto,
    description:
      'CommonAdministrativeAreaLevel2 [input here api field description]',
  })
  administrativeAreaLevel2?: CommonAdministrativeAreaLevel2Dto;

  @ApiProperty({
    type: String,
    description:
      'Standard code for the administrative area (e.g., &quot;LA&quot; for Los Angeles city). Must be unique across all level 3 areas. Maximum 8 characters.',
  })
  code: string;

  @ApiProperty({
    type: String,
    description:
      'Optional custom code defined by the organization for internal identification. Must be unique if provided. Can be used for legacy system integration or custom business logic.',
  })
  customCode?: string;

  @ApiProperty({
    type: String,
    description:
      'Full name of the administrative area (e.g., &quot;Los Angeles&quot;, &quot;Manhattan&quot;, &quot;Paris&quot;). Indexed for efficient searching and sorting.',
  })
  name: string;

  @ApiProperty({
    type: String,
    description:
      'URL-friendly identifier derived from the name. Lowercase, hyphenated format (e.g., &quot;los-angeles&quot;, &quot;new-york-city&quot;). Used for SEO-friendly URLs and routing.',
  })
  slug: string;

  @ApiProperty({
    type: Number,
    description:
      'Geographical latitude coordinate of the administrative area&#x27;s center point. Precision of 14 decimal places allows sub-meter accuracy. Used for map visualization and distance calculations.',
  })
  latitude?: number;

  @ApiProperty({
    type: Number,
    description:
      'Geographical longitude coordinate of the administrative area&#x27;s center point. Precision of 14 decimal places allows sub-meter accuracy. Used for map visualization and distance calculations.',
  })
  longitude?: number;

  @ApiProperty({
    type: Number,
    description:
      'Default zoom level for map display when viewing this administrative area. Typical range: 1 (world view) to 21 (building level). Usually highest zoom level for detailed city/municipality view.',
  })
  zoom?: number;

  @ApiProperty({
    enum: CommonAdministrativeAreaLevel3MapType,
    description:
      'Preferred map visualization type for this area. ROADMAP: Street map view. SATELLITE: Aerial imagery. HYBRID: Satellite with road overlay. TERRAIN: Topographic relief map. NULL uses system default.',
    example: CommonAdministrativeAreaLevel1MapType.TERRAIN,
  })
  mapType?: CommonAdministrativeAreaLevel3MapType;

  @ApiProperty({
    type: String,
    description:
      'Timestamp when the record was created. Automatically set on insertion. Part of audit trail.',
  })
  createdAt?: string;

  @ApiProperty({
    type: String,
    description:
      'Timestamp of the last update to the record. Automatically updated on modification. Part of audit trail.',
  })
  updatedAt?: string;

  @ApiProperty({
    type: String,
    description:
      'Soft delete timestamp. NULL indicates active record. When set, record is excluded from normal queries but preserved for audit and recovery.',
  })
  deletedAt?: string;
}
