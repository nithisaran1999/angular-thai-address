import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-input-container',
  standalone: true,
  imports: [],
  templateUrl: './input-container.component.html',
  styleUrl: './input-container.component.css'
})
export class InputContainerComponent {
  @Input() label: string = "";
  @Output() input = new EventEmitter<any>();

  get hasLabel(): boolean {
    return this.label?.length > 0;
  }

  onInput(value: any): void {
    this.input.emit(value);
  }
}
