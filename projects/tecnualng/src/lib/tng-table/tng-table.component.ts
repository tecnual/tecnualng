import { Component, Input, computed, signal, model, contentChild, TemplateRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TecnualInputComponent } from '../tng-input/tng-input.component';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  template?: TemplateRef<any>;
}

@Component({
  selector: 'tng-table',
  standalone: true,
  imports: [CommonModule, FormsModule, TecnualInputComponent],
  templateUrl: './tng-table.component.html',
  styleUrls: ['./tng-table.component.scss']
})
export class TecnualTableComponent {
  data = input.required<any[]>();
  columns = input.required<TableColumn[]>();
  pageSize = input<number>(10);
  filterable = input<boolean>(true);
  
  // State
  searchQuery = signal('');
  currentPage = signal(1);
  sortColumn = signal<string | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Computed
  filteredData = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const rawData = this.data();
    
    if (!query) return rawData;

    return rawData.filter(row => {
      return Object.values(row).some(val => 
        String(val).toLowerCase().includes(query)
      );
    });
  });

  sortedData = computed(() => {
    const data = [...this.filteredData()];
    const column = this.sortColumn();
    const direction = this.sortDirection();

    if (!column) return data;

    return data.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  });

  paginatedData = computed(() => {
    const data = this.sortedData();
    const size = this.pageSize();
    const page = this.currentPage();
    const startIndex = (page - 1) * size;
    
    return data.slice(startIndex, startIndex + size);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredData().length / this.pageSize());
  });

  // Actions
  onSort(column: TableColumn) {
    if (!column.sortable) return;

    if (this.sortColumn() === column.key) {
      // Toggle direction
      this.sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      // New column
      this.sortColumn.set(column.key);
      this.sortDirection.set('asc');
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.currentPage.set(1); // Reset to first page on search
  }

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onSearch(input.value);
  }
}
