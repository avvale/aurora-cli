// src/app/shared/pipes/truncate-words.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncates a string by words.
 *
 * @example
 *   {{ 'This is an example text' | truncateWords:3 }}
 *   → "This is an…"
 *
 * @example
 *   {{ 'This is an example text' | truncateWords:3:' (read more)' }}
 *   → "This is an (read more)"
 */
@Pipe({
    name: 'truncateWords',
})
export class TruncateWordsPipe implements PipeTransform {

    transform(
        value: string | null | undefined,
        limit = 10,          // maximum number of words
        suffix = '…',        // suffix when the limit is exceeded
    ): string
    {

        if (typeof value !== 'string' || !value.trim()) {
            return '';
        }

        const words = value.trim().split(/\s+/);

        if (words.length <= limit) {
            return value;
        }

        const truncated = words.slice(0, limit).join(' ');
        return `${truncated}${suffix}`;
    }
}