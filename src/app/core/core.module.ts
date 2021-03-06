import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppAnimationModule } from './animation/app-animation.module';
import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import { AppMaterialModule } from './material/app-material.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppAnimationModule,
    AppMaterialModule
  ],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
