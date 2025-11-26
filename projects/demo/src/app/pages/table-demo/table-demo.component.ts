import { Component, viewChild, TemplateRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TecnualTableComponent, TableColumn } from 'tecnualng';
import { CodeExampleComponent, CodeTab } from '../../components/code-example/code-example.component';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [CommonModule, TecnualTableComponent, CodeExampleComponent],
  templateUrl: './table-demo.component.html',
  styles: [`
    .demo-container {
      padding: 20px;
    }
    h1 {
      margin-bottom: 20px;
      color: #333;
    }
    .status-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      
      &.active {
        background-color: #e8f5e9;
        color: #2e7d32;
      }
      
      &.inactive {
        background-color: #ffebee;
        color: #c62828;
      }
      
      &.pending {
        background-color: #fff3e0;
        color: #ef6c00;
      }
    }
  `]
})
export class TableDemoComponent {
  statusTemplate = viewChild<TemplateRef<any>>('statusTemplate');

  baseColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'lastLogin', label: 'Last Login', sortable: true }
  ];

  columns = computed(() => {
    const tmpl = this.statusTemplate();
    return this.baseColumns.map(col => {
      if (col.key === 'status' && tmpl) {
        return { ...col, template: tmpl };
      }
      return col;
    });
  });

  users = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? 'Admin' : (i % 3 === 1 ? 'Editor' : 'Viewer'),
    status: i % 4 === 0 ? 'Inactive' : (i % 4 === 1 ? 'Pending' : 'Active'),
    lastLogin: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
  }));

  tableCode: CodeTab[] = [
    {
      label: 'TypeScript',
      language: 'typescript',
      code: `import { Component, viewChild, TemplateRef, computed } from '@angular/core';
import { TecnualTableComponent, TableColumn } from 'tecnualng';

@Component({
  selector: 'app-table-demo',
  imports: [TecnualTableComponent],
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.scss']
})
export class TableDemoComponent {
  statusTemplate = viewChild<TemplateRef<any>>('statusTemplate');

  baseColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: false },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'lastLogin', label: 'Last Login', sortable: true }
  ];

  columns = computed(() => {
    const tmpl = this.statusTemplate();
    return this.baseColumns.map(col => {
      if (col.key === 'status' && tmpl) {
        return { ...col, template: tmpl };
      }
      return col;
    });
  });

  users = [
    { id: 1, name: 'User 1', email: 'user1@example.com', role: 'Admin', status: 'Active', lastLogin: '1/1/2024' },
    // ... more data
  ];
}`
    },
    {
      label: 'HTML',
      language: 'html',
      code: `<tng-table
  [data]="users"
  [columns]="columns()"
  [pageSize]="10"
  [filterable]="true"
>
  <ng-template #statusTemplate let-status>
    <span class="status-badge" [ngClass]="status.toLowerCase()">
      {{ status }}
    </span>
  </ng-template>
</tng-table>`
    },
    {
      label: 'CSS',
      language: 'css',
      code: `.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  
  &.active {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  &.inactive {
    background-color: #ffebee;
    color: #c62828;
  }
  
  &.pending {
    background-color: #fff3e0;
    color: #ef6c00;
  }
}`
    }
  ];
}
