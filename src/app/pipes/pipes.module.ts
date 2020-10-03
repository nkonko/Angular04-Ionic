import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoneFilterPipe } from './done-filter.pipe';



@NgModule({
  declarations: [DoneFilterPipe],
  exports: [DoneFilterPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
