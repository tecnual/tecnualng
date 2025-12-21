import { Component, signal, output, computed, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectOption, PanelItem } from './tng-select.directive';

@Component({
  selector: 'tng-select-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tng-select-panel.component.html',
  styleUrl: './tng-select-panel.component.scss'
})
export class TngSelectPanelComponent {
  // Inputs
  items = signal<PanelItem[]>([]);
  selectedIndices = signal<number[]>([]);
  enableMulti = signal<boolean>(false);
  enableSearch = signal<boolean>(false);
  searchQuery = signal<string>('');

  // Outputs
  optionSelected = output<number>();
  searchQueryChanged = output<string>();
  closeRequested = output<void>();

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.searchQueryChanged.emit(input.value);
  }

  isSelected(index: number | undefined): boolean {
    if (index === undefined) return false;
    return this.selectedIndices().includes(index);
  }

  onOptionClick(index: number | undefined, option: SelectOption) {
    if (index === undefined || option.disabled) {
      return;
    }
    this.optionSelected.emit(index);
  }
}
