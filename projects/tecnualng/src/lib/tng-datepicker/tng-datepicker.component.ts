import { Component, Input, Output, EventEmitter, ElementRef, HostListener, forwardRef, signal, computed, input, model, ChangeDetectionStrategy } from '@angular/core';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TecnualDatepickerComponent implements ControlValueAccessor {
  label = input('');
  placeholder = input('');
  mode = input<'single' | 'range'>('single');
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);
  disabled = model<boolean>(false);
  id = input<string>(`tng-datepicker-${Math.random().toString(36).substr(2, 9)}`);

  locale = input<string>((typeof navigator !== 'undefined' ? navigator.language : 'en-US'));
  firstDayOfWeek = input<0 | 1 | 2 | 3 | 4 | 5 | 6 | null>(null); // 0 = Sunday, 1 = Monday, etc.

  isOpen = signal(false);
  currentViewDate = signal(new Date()); // The month we are looking at
  
  viewMode = signal<'day' | 'month' | 'year'>('day');

  // Value storage
  singleValue: Date | null = null;
  rangeValue: DateRange = { start: null, end: null };

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private elementRef: ElementRef) {}

  private getEffectiveFirstDayOfWeek(): number {
    const definedDay = this.firstDayOfWeek();
    if (definedDay !== null) return definedDay;
    
    // Try to determine from locale
    try {
      // @ts-ignore: weekInfo is a newer API, might need a shim or ignore
      const weekInfo = (new Intl.Locale(this.locale()) as any).weekInfo;
      if (weekInfo && typeof weekInfo.firstDay === 'number') {
        return weekInfo.firstDay;
      }
    } catch (e) {
      // Fallback
    }
    // Default fallback: US=0 (Sun), others usually 1 (Mon). Simplified logic:
    const l = this.locale().toLowerCase();
    if (l.includes('us') || l.includes('en-ca') || l.includes('zh')) return 0;
    return 1;
  }

  // Calendar Logic
  daysOfWeek = computed(() => {
    const firstDay = this.getEffectiveFirstDayOfWeek();
    const days: string[] = [];
    // Create a date that is definitely a valid day index to start iterating.
    // 2024-01-07 is a Sunday. 
    // We want to generate names: Sun, Mon, etc.
    // Let's iterate 7 days starting from a known Sunday + offset
    const baseDate = new Date(2024, 0, 7); // Jan 7, 2024 is Sunday
    const formatter = new Intl.DateTimeFormat(this.locale(), { weekday: 'short' });

    for (let i = 0; i < 7; i++) {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() + (firstDay + i));
        // Remove dot usually found in some locales (e.g. es-ES "lun.") if desired or keep it.
        // Let's keep it clean
        days.push(formatter.format(d).replace('.', '')); 
    }
    return days;
  });

  monthNames = computed(() => {
     const formatter = new Intl.DateTimeFormat(this.locale(), { month: 'long' });
     const months: string[] = [];
     for(let i=0; i<12; i++) {
         const d = new Date(2024, i, 1);
         months.push(formatter.format(d));
     }
     return months;
  });
  
  calendarDays = computed(() => {
    const year = this.currentViewDate().getFullYear();
    const month = this.currentViewDate().getMonth();
    const firstDayIndex = this.getEffectiveFirstDayOfWeek();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const days: Date[] = [];
    
    // Padding days from previous month
    // Calculate how many days to fallback:
    // current day of week (0-6) - firstDayIndex
    // if result < 0, add 7
    let startDayOfWeek = firstDayOfMonth.getDay(); 
    let daysToBacktrack = startDayOfWeek - firstDayIndex;
    if (daysToBacktrack < 0) daysToBacktrack += 7;

    for (let i = daysToBacktrack - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }
    
    // Days of current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Padding days for next month to fill complete rows (usually 6 rows total 42 days)
    const remaining = 42 - days.length; 
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  });

  yearsList = computed(() => {
    // Generate a 12-year grid centered somewhat around the current view date
    const centerYear = this.currentViewDate().getFullYear();
    const startYear = centerYear - 6;
    const years: number[] = [];
    for (let i = 0; i < 12; i++) {
      years.push(startYear + i);
    }
    return years;
  });

  get formattedValue(): string {
    const locale = this.locale();
    if (this.mode() === 'single') {
      return this.singleValue ? this.singleValue.toLocaleDateString(locale) : '';
    } else {
      if (this.rangeValue.start && this.rangeValue.end) {
        return `${this.rangeValue.start.toLocaleDateString(locale)} - ${this.rangeValue.end.toLocaleDateString(locale)}`;
      } else if (this.rangeValue.start) {
        return `${this.rangeValue.start.toLocaleDateString(locale)} - ...`;
      }
      return '';
    }
  }

  get headerLabel(): string {
    const d = this.currentViewDate();
    if (this.viewMode() === 'day') {
      return d.toLocaleString(this.locale(), { month: 'long', year: 'numeric' });
    } else if (this.viewMode() === 'month') {
      return d.getFullYear().toString();
    } else {
      // Year range
      const years = this.yearsList();
      return `${years[0]} - ${years[years.length - 1]}`;
    }
  }

  toggleCalendar(event?: Event) {
    if (this.disabled()) return;
    
    // If clicking the input itself, ensure we don't close if already open
    if (event && (event.target as HTMLElement).tagName === 'INPUT') {
      if (!this.isOpen()) {
        this.isOpen.set(true);
        this.viewMode.set('day');
      }
      return;
    }

    if (!this.isOpen()) {
       // Reset to day view when opening
       this.viewMode.set('day');
    }
    this.isOpen.update(v => !v);
    if (!this.isOpen()) {
      this.onTouched();
    }
  }

  onHeaderClick() {
    // Drill up: Day -> Month -> Year
    if (this.viewMode() === 'day') {
      this.viewMode.set('month');
    } else if (this.viewMode() === 'month') {
      this.viewMode.set('year');
    }
  }

  prev(e: Event) {
    e.stopPropagation();
    const d = this.currentViewDate();
    if (this.viewMode() === 'day') {
      this.currentViewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    } else if (this.viewMode() === 'month') {
      this.currentViewDate.set(new Date(d.getFullYear() - 1, d.getMonth(), 1));
    } else {
      this.currentViewDate.set(new Date(d.getFullYear() - 12, d.getMonth(), 1));
    }
  }

  next(e: Event) {
    e.stopPropagation();
    const d = this.currentViewDate();
    if (this.viewMode() === 'day') {
      this.currentViewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    } else if (this.viewMode() === 'month') {
      this.currentViewDate.set(new Date(d.getFullYear() + 1, d.getMonth(), 1));
    } else {
      this.currentViewDate.set(new Date(d.getFullYear() + 12, d.getMonth(), 1));
    }
  }
  
  selectMonth(monthIndex: number) {
    const d = this.currentViewDate();
    this.currentViewDate.set(new Date(d.getFullYear(), monthIndex, 1));
    this.viewMode.set('day');
  }

  selectYear(year: number) {
    const d = this.currentViewDate();
    this.currentViewDate.set(new Date(year, d.getMonth(), 1));
    this.viewMode.set('month');
  }

  selectDate(date: Date, closeCalendar = true) {
    if (this.isDisabled(date)) return;

    if (this.mode() === 'single') {
      this.singleValue = date;
      this.currentViewDate.set(new Date(date)); // Sync view
      this.onChange(date);
      if (closeCalendar) this.isOpen.set(false);
    } else {
      // Range logic
      if (!this.rangeValue.start || (this.rangeValue.start && this.rangeValue.end)) {
        // Start new range
        this.rangeValue = { start: date, end: null };
        this.currentViewDate.set(new Date(date)); // Sync view
      } else {
        // Complete range
        if (date < this.rangeValue.start) {
          this.rangeValue = { start: date, end: this.rangeValue.start };
        } else {
          this.rangeValue = { ...this.rangeValue, end: date };
        }
        this.onChange(this.rangeValue);
        if (closeCalendar) this.isOpen.set(false);
      }
    }
  }

  private parseDate(value: string): Date | null {
    if (!value) return null;
    
    const locale = this.locale();
    // Use Intl to determine the order of parts
    const parts = new Intl.DateTimeFormat(locale).formatToParts(new Date(2000, 10, 25)); // Nov 25, 2000
    // Parts will contain type: 'day', 'month', 'year', 'literal'
    
    const formatOrder: string[] = [];
    parts.forEach(p => {
        if (p.type === 'day' || p.type === 'month' || p.type === 'year') {
            formatOrder.push(p.type);
        }
    });
    
    // Split input by non-digit characters
    const dateParts = value.split(/\D+/).filter(part => part.trim() !== '').map(p => parseInt(p, 10));
    
    if (dateParts.length !== 3) {
        // Fallback to standard parse if structure doesn't match
        const d = new Date(value);
        return isNaN(d.getTime()) ? null : d;
    }
    
    let day: number | undefined;
    let month: number | undefined;
    let year: number | undefined;
    
    // Map input parts to Day/Month/Year based on locale order
    for (let i = 0; i < 3; i++) {
        const type = formatOrder[i];
        const val = dateParts[i];
        if (type === 'day') day = val;
        if (type === 'month') month = val - 1; // JS months are 0-indexed
        if (type === 'year') year = val;
    }
    
    if (day === undefined || month === undefined || year === undefined) return null;

    // Validate year length (handle 2-digit years if needed, but let's stick to 4 for now or simple logic)
    if (year < 100) year += 2000; // Very basic 2-digit handling
    
    const d = new Date(year, month, day);
    if (d.getFullYear() === year && d.getMonth() === month && d.getDate() === day) {
        return d;
    }
    return null;
  }

  onManualInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) return; 

    // Try localized parse first
    let date = this.parseDate(value);
    
    if (date) {
      this.selectDate(date, false);
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
