import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Inject } from '@angular/core';
import { FilePreviewOverlayRef } from './file-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './file-preview-overlay.tokens';
import { Image } from './file-preview-overlay.types';
import { saveAs } from 'file-saver';
import { Utils } from '@aurora';

// Keycode for ESCAPE
const ESCAPE = 'Escape';
// Reusable animation timings
const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
    selector: 'au-file-preview-overlay',
    template: `
        <au-file-preview-overlay-toolbar>
            <div class="flex content-center">
                <mat-icon>description</mat-icon>
                {{ image.filename }}
            </div>
            <button
                mat-icon-button
                (click)="download()"
            >
                <mat-icon>file_download</mat-icon>
            </button>
        </au-file-preview-overlay-toolbar>
        <div
            class="overlay-content"
            [@slideContent]="animationState"
            (@slideContent.start)="onAnimationStart($event)"
            (@slideContent.done)="onAnimationDone($event)"
        >
            <div
                *ngIf="loading"
                class="spinner-wrapper"
            >
                <mat-spinner></mat-spinner>
            </div>
            <img
                [@fade]="loading ? 'fadeOut' : 'fadeIn'"
                (load)="onLoad($event)"
                [style.opacity]="loading ? 0 : 1"
                [src]="image.prefix + image.binary"
            >
        </div>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        h1 {
            margin: 0;
            padding: 1em;
        }

        img {
            width: 100%;
            max-width: 500px;
            height: auto;
        }

        .overlay-content {
            padding: 1em;
        }
    `],
    animations: [
        trigger('fade', [
            state('fadeOut', style({ opacity: 0 })),
            state('fadeIn', style({ opacity: 1 })),
            transition('* => fadeIn', animate(ANIMATION_TIMINGS)),
        ]),
        trigger('slideContent', [
            state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
            state('enter', style({ transform: 'none', opacity: 1 })),
            state('leave', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
            transition('* => *', animate(ANIMATION_TIMINGS)),
        ]),
    ],
})
export class FilePreviewOverlayComponent
{
    loading: boolean = false;
    animationState: 'void' | 'enter' | 'leave' = 'enter';
    animationStateChanged = new EventEmitter<AnimationEvent>();

    constructor(
        public dialogRef: FilePreviewOverlayRef,
        @Inject(FILE_PREVIEW_DIALOG_DATA) public image: Image,
    )
    { }

    // Listen on keydown events on a document level
    @HostListener('document:keydown', ['$event'])
    private handleKeydown(event: KeyboardEvent): void
    {
        if (event.code === ESCAPE)
        {
            this.dialogRef.close();
        }
    }

    onLoad(event: Event): void
    {
        this.loading = false;
    }

    onAnimationStart(event: AnimationEvent): void
    {
        this.animationStateChanged.emit(event);
    }

    onAnimationDone(event: AnimationEvent): void
    {
        this.animationStateChanged.emit(event);
    }

    startExitAnimation(): void
    {
        this.animationState = 'leave';
    }

    download(): void
    {
        const blob = Utils.convertBase64ToFile(this.image.binary,  this.image.mime);
        saveAs(blob, this.image.filename);
    }
}