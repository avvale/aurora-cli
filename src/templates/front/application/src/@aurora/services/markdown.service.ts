import { Injectable } from '@angular/core';
import { marked } from 'marked';

@Injectable({
    providedIn: 'root',
})
export class MarkdownService
{
    markdownToHtml(markdown: string): string | Promise<string>
    {
        return marked(markdown);
    }
}
