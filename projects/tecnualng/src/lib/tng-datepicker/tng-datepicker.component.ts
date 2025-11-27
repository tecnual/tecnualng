import { Component, Input, Output, EventEmitter, ElementRef, HostListener, forwardRef, signal, computed, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { addYears } from '../utils/date-utils';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

@Component({
  selector: 'tng-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tng-datepicker.component.html',
  styleUrls: ['./tng-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TecnualDatepickerComponent),
      multi: true
    }
  ]
})
export class TecnualDatepickerComponent implements ControlValueAccessor {
  label = input('');
  placeholder = input('');
  mode = input<'single' | 'range'>('single');
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);
  disabled = model<boolean>(false);
  id = input<string>(`tng-datepicker-${Math.random().toString(36).substr(2, 9)}`);

  isOpen = signal(false);
  currentViewDate = signal(new Date()); // The month we are looking at
  
  // Value storage
  singleValue: Date | null = null;
  rangeValue: DateRange = { start: null, end: null };

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private elementRef: ElementRef) {}

  // Calendar Logic
  readonly daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  calendarDays = computed(() => {
    const year = this.currentViewDate().getFullYear();
    const month = this.currentViewDate().getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const days: Date[] = [];
    
    // Padding days from previous month
    const startDay = firstDayOfMonth.getDay();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }
    
    // Days of current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Padding days for next month (to fill 6 rows usually, or just enough to finish week)
    const remaining = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  });

  get formattedValue(): string {
    if (this.mode() === 'single') {
      return this.singleValue ? this.singleValue.toLocaleDateString() : '';
    } else {
      if (this.rangeValue.start && this.rangeValue.end) {
        return `${this.rangeValue.start.toLocaleDateString()} - ${this.rangeValue.end.toLocaleDateString()}`;
      } else if (this.rangeValue.start) {
        return `${this.rangeValue.start.toLocaleDateString()} - ...`;
      }
      return '';
    }
  }

  get currentMonthYear(): string {
    return this.currentViewDate().toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  toggleCalendar() {
    if (this.disabled()) return;
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      // Focus logic if needed
    } else {
      this.onTouched();
    }
  }

  prevMonth(e: Event) {
    e.stopPropagation();
    const d = this.currentViewDate();
    this.currentViewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth(e: Event) {
    e.stopPropagation();
    const d = this.currentViewDate();
    this.currentViewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  selectDate(date: Date) {
    if (this.isDisabled(date)) return;

    if (this.mode() === 'single') {
      this.singleValue = date;
      this.onChange(date);
      this.isOpen.set(false);
    } else {
      // Range logic
      if (!this.rangeValue.start || (this.rangeValue.start && this.rangeValue.end)) {
        // Start new range
        this.rangeValue = { start: date, end: null };
      } else {
        // Complete range
        if (date < this.rangeValue.start) {
          this.rangeValue = { start: date, end: this.rangeValue.start };
        } else {
          this.rangeValue = { ...this.rangeValue, end: date };
        }
        this.onChange(this.rangeValue);
        this.isOpen.set(false);
      }
    }
  }

  // Helper checks
  isSelected(date: Date): boolean {
    if (this.mode() === 'single') {
      return this.isSameDay(date, this.singleValue);
    } else {
      return this.isSameDay(date, this.rangeValue.start) || this.isSameDay(date, this.rangeValue.end);
    }
  }

  isInRange(date: Date): boolean {
    if (this.mode() !== 'range' || !this.rangeValue.start || !this.rangeValue.end) return false;
    return date > this.rangeValue.start && date < this.rangeValue.end;
  }

  isSameDay(d1: Date | null, d2: Date | null): boolean {
    if (!d1 || !d2) return false;
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  }

  isToday(date: Date): boolean {
    return this.isSameDay(date, new Date());
  }

  isDisabled(date: Date): boolean {
    if (this.minDate() && date < this.setMidnight(this.minDate()!)) return true;
    if (this.maxDate() && date > this.setMidnight(this.maxDate()!)) return true;
    
    // Check if it belongs to current month (optional, but good for visual clarity)
    // We might want to allow selecting padding days, but usually we just dim them.
    // Let's just disable interaction for padding days if we want strict month view, 
    // but standard is to allow navigating to them.
    // For now, let's just check min/max.
    return false;
  }
  
  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentViewDate().getMonth();
  }

  private setMidnight(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  // ControlValueAccessor
  writeValue(obj: any): void {
    if (this.mode() === 'single') {
      this.singleValue = obj instanceof Date ? obj : null;
      if (this.singleValue) this.currentViewDate.set(new Date(this.singleValue));
    } else {
      this.rangeValue = obj || { start: null, end: null };
      if (this.rangeValue.start) this.currentViewDate.set(new Date(this.rangeValue.start));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.update(() =>isDisabled);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
      this.onTouched();
    }
  }
}
