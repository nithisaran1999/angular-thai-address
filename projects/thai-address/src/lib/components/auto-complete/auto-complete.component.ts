
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import AddressEntry from '../../../../types/AddressEntry';
import addressToString from '../../../../utils/addressToString';
import Target from '../../../../types/Target';

@Component({
  selector: 'lib-auto-complete',
  standalone: true,
  imports: [],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss'
})
export class AutocompleteComponent {
  @Input() query: string = "";
  @Input() items: AddressEntry[] = [];
  @Input() target: Target = "district"||"province"||"subdistrict"||"zipcode";; 
  @Input() maxHeight: number = 0;
  @Input() itemCount: number = 0;
  @Input() selectedIndex: number = -1;

  @Output() itemClick = new EventEmitter<AddressEntry>();
  @Output() selectedIndexChange = new EventEmitter<number>();

  @ViewChildren('autocompleteItem') autocompleteItems!: QueryList<ElementRef>;

  get autocompleteStyle() {
    return {
      maxHeight: `${this.maxHeight}px`,
      listStyle: 'none',
      margin: 0,
      overflowY: 'auto',
      padding: 0,
      position: 'absolute',
      width: '100%',
      zIndex: 1
    };
  }

  get autocompleteListStyle() {
    const itemHeight = this.maxHeight / this.itemCount;
    return {
      height: `${itemHeight}px`,
      cursor: 'pointer'
    };
  }

  get hasData(): boolean {
    return this.items && this.items.length > 0;
  }

  get itemList() {
    return this.items.map(item => {
      return {
        data: { ...item },
        text: addressToString(item, this.target, this.query)
      };
    });
  }

  onItemClick(item: AddressEntry): void {
    this.itemClick.emit(item);
  }

  changeSelectedIndex(index: number): void {
    if (index >= 0 && index < this.itemList.length) {
      this.selectedIndexChange.emit(index);
    }
  }

  ngOnChanges() {
    if (this.selectedIndex === -1 && this.autocompleteItems) {
      this.autocompleteItems.forEach(item => (item.nativeElement.scrollTop = 0));
      return;
    }

    this.scrollToSelectedItem();
  }

  private scrollToSelectedItem() {
    if (this.autocompleteItems && this.autocompleteItems.toArray()[this.selectedIndex]) {
      const listContainer = this.autocompleteItems.first.nativeElement.parentElement;
      const selectItem = this.autocompleteItems.toArray()[this.selectedIndex].nativeElement;

      const itemBottom = selectItem.offsetTop + selectItem.offsetHeight;
      if (selectItem.offsetTop < listContainer.scrollTop) {
        listContainer.scrollTop = selectItem.offsetTop;
      } else if (itemBottom - listContainer.scrollTop > listContainer.offsetHeight) {
        listContainer.scrollTop = selectItem.offsetTop - (listContainer.offsetHeight - selectItem.offsetHeight);
      }
    }
  }
}