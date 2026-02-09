/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import { CommonAdministrativeAreaLevel2MapType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class CommonCreateAdministrativeAreaLevel2Dto {
  @ApiProperty({
    type: String,
    description:
      'Unique identifier for the administrative area level 2. UUID v4 format, generated automatically on creation.',
  })
  id: string;

  @ApiProperty({
    type: String,
    description:
      'Foreign key to the country this administrative area belongs to. Denormalized from level 1 for efficient querying without joins.',
    example: 'f117d0ca-6c95-5bdd-9e9d-ffa16c621e74',
  })
  countryId: string;

  @ApiProperty({
    type: String,
    description:
      'Foreign key to the parent administrative area level 1. Establishes hierarchical relationship (e.g., county belongs to state).',
    example: '018e2f70-60e0-5606-89d2-9380ed78e8ff',
  })
  administrativeAreaLevel1Id: string;

  @ApiProperty({
    type: String,
    description:
      'Standard code for the administrative area (e.g., &quot;LAC&quot; for Los Angeles County). Must be unique across all level 2 areas. Maximum 8 characters.',
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
      'Full name of the administrative area (e.g., &quot;Los Angeles County&quot;, &quot;District of Columbia&quot;). Indexed for efficient searching and sorting.',
  })
  name: string;

  @ApiProperty({
    type: String,
    description:
      'URL-friendly identifier derived from the name. Lowercase, hyphenated format (e.g., &quot;los-angeles-county&quot;, &quot;king-county&quot;). Used for SEO-friendly URLs and routing.',
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
      'Default zoom level for map display when viewing this administrative area. Typical range: 1 (world view) to 21 (building level). Usually higher than level 1 for more detailed view.',
  })
  zoom?: number;

  @ApiProperty({
    enum: CommonAdministrativeAreaLevel2MapType,
    description:
      'Preferred map visualization type for this area. ROADMAP: Street map view. SATELLITE: Aerial imagery. HYBRID: Satellite with road overlay. TERRAIN: Topographic relief map. NULL uses system default.',
    example: CommonAdministrativeAreaLevel2MapType.TERRAIN,
  })
  mapType?: CommonAdministrativeAreaLevel2MapType;
}
