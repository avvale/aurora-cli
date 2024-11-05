import { ComponentRef, Injectable, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FilePreviewOverlayComponent } from './image-preview-overlay.component';
import { ImagePreviewDialogConfig } from './image-preview-overlay.types';
import { ImagePreviewOverlayRef } from './image-preview-overlay-ref';
import { DEFAULT_CONFIG, IMAGE_PREVIEW_DIALOG_DATA } from './image-preview-overlay.tokens';

@Injectable({
    providedIn: 'root',
})
export class ImagePreviewOverlayService
{
    constructor(
        private readonly overlay: Overlay,
        private readonly location: Location,
        private readonly injector: Injector,
    ) { }

    open(config: ImagePreviewDialogConfig = {}): ImagePreviewOverlayRef
    {
        // Override default configuration
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };

        // Returns an OverlayRef (which is a PortalHost)
        const overlayRef = this.createOverlay(dialogConfig);

        // add close functionality to the overlay
        const dialogRef = new ImagePreviewOverlayRef(overlayRef);

        const overlayComponent = this.attachDialogContainer(
            overlayRef,
            dialogConfig,
            dialogRef,
        );

        // Pass the instance of the overlay component to the remote control
        dialogRef.componentInstance = overlayComponent;

        // Subscribe to a stream that emits when the backdrop was clicked
        overlayRef.backdropClick().subscribe(_ => dialogRef.close());

        //this.location.subscribe(_ => dialogRef.close());

        return dialogRef;
    }

    private attachDialogContainer(
        overlayRef: OverlayRef,
        config: ImagePreviewDialogConfig,
        dialogRef: ImagePreviewOverlayRef,
    ): FilePreviewOverlayComponent
    {
        const injector = this.createInjector(config, dialogRef);

        const containerPortal = new ComponentPortal(FilePreviewOverlayComponent, null, injector);
        const containerRef: ComponentRef<FilePreviewOverlayComponent> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private createInjector(
        config: ImagePreviewDialogConfig,
        dialogRef: ImagePreviewOverlayRef,
    ): Injector
    {
        // Instantiate new FilePreviewOverlayInjector
        return Injector.create({
            providers: [
                { provide: ImagePreviewOverlayRef, useValue: dialogRef },
                { provide: IMAGE_PREVIEW_DIALOG_DATA, useValue: config.image },
            ],
            parent: this.injector,
            name  : 'FilePreviewOverlayInjector',
        });
    }

    private getOverlayConfig(config: ImagePreviewDialogConfig): OverlayConfig
    {
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop   : config.hasBackdrop,
            backdropClass : config.backdropClass,
            panelClass    : config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy,
        });

        return overlayConfig;
    }

    private createOverlay(config: ImagePreviewDialogConfig): OverlayRef
    {
        // Returns an OverlayConfig
        const overlayConfig = this.getOverlayConfig(config);

        // Returns an OverlayRef
        return this.overlay.create(overlayConfig);
    }
}