/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonLangDir } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class CommonLangDto {
  @ApiProperty({
    type: String,
    description:
      'Unique identifier for the language. UUID v4 format, generated automatically on creation.',
  })
  id: string;

  @ApiProperty({
    type: Number,
    description:
      'Auto-incrementing sequential identifier for the lang. Used for internal ordering, human-readable reference numbers, and optimized queries. Not exposed in external APIs. Provides a stable, predictable identifier for database operations.',
  })
  rowId: number;

  @ApiProperty({
    type: String,
    description:
      'Full name of the language in its native form (e.g., &quot;English&quot;, &quot;Español&quot;, &quot;Français&quot;, &quot;日本語&quot;). Used for display in language selectors. Should be recognizable by native speakers.',
  })
  name: string;

  @ApiProperty({
    type: String,
    description:
      'URL or path to language flag/icon image. Typically country flag representing the language (e.g., UK flag for English, Spain flag for Spanish). Used for visual language identification. Maximum 1022 characters for long URLs.',
  })
  image?: string;

  @ApiProperty({
    type: String,
    description:
      'ISO 639-2 two-letter language code (e.g., &quot;en&quot;, &quot;es&quot;, &quot;fr&quot;, &quot;ja&quot;). Standard international identifier for languages. Most commonly used ISO standard. Indexed for efficient lookups. Required field.',
  })
  iso6392: string;

  @ApiProperty({
    type: String,
    description:
      'ISO 639-3 three-letter language code (e.g., &quot;eng&quot;, &quot;spa&quot;, &quot;fra&quot;, &quot;jpn&quot;). Alternative standard identifier providing more specific language identification. Indexed for efficient lookups. Required field.',
  })
  iso6393: string;

  @ApiProperty({
    type: String,
    description:
      'IETF language tag (BCP 47) for language and region (e.g., &quot;en-US&quot;, &quot;es-ES&quot;, &quot;fr-FR&quot;, &quot;ja-JP&quot;). Combines language code with region/country code. Used for locale-specific formatting (dates, numbers, currency). Indexed for efficient lookups. Required field.',
  })
  ietf: string;

  @ApiProperty({
    type: String,
    description:
      'Optional custom code defined by the organization for internal identification. Can be used for legacy system integration or custom business logic. Indexed for efficient lookups.',
  })
  customCode?: string;

  @ApiProperty({
    enum: CommonLangDir,
    description:
      'Text directionality for the language. LTR: Left-to-right (English, Spanish, French, etc.). RTL: Right-to-left (Arabic, Hebrew, Persian, etc.). Critical for proper UI layout and text rendering. Required field.',
  })
  dir: CommonLangDir;

  @ApiProperty({
    type: Number,
    description:
      'Display order for language lists in UI. Lower values appear first. NULL values typically sorted last or alphabetically. Used for prioritizing commonly used languages (e.g., English first, then Spanish).',
  })
  sort?: number;

  @ApiProperty({
    type: Boolean,
    description:
      'Indicates if the language is currently active and available for use. TRUE: Language selectable and content can be translated. FALSE: Language disabled, existing translations preserved but not editable. Used for feature toggles and gradual rollout. Required field.',
  })
  isActive: boolean;

  @ApiProperty({
    type: String,
    description:
      'Timestamp when the language was added to the system. Automatically set on insertion. Part of audit trail.',
  })
  createdAt?: string;

  @ApiProperty({
    type: String,
    description:
      'Timestamp of the last update to the language record. Automatically updated on modification. Part of audit trail.',
  })
  updatedAt?: string;

  @ApiProperty({
    type: String,
    description:
      'Soft delete timestamp. NULL indicates active language. When set, language is excluded from normal queries but preserved for data integrity of existing translations and historical records.',
  })
  deletedAt?: string;
}
