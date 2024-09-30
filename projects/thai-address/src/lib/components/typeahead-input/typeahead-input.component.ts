import { Component, EventEmitter, Input, Output } from '@angular/core';
import DataStore, { defaultStore } from '../../../../data/DataStore';
import Target from '../../../../types/Target';
import { ALLOWED_ATTRS, AUTOCOMPLETE_CLOSE_DELAY } from '../../../../lib/constants';
import getPossibles from '../../../../lib/getPossibles';
import AddressEntry from '../../../../types/AddressEntry';
import AddressModel from '../../../../types/AddressModel';
import addressEntryToModel from '../../../../utils/addressEntryToModel';

@Component({
  selector: 'lib-typeahead-input',
  standalone: true,
  imports: [],
  templateUrl: './typeahead-input.component.html',
  styleUrl: './typeahead-input.component.scss'
})
export class TypeaheadInputComponent {
  @Input() value: string = '';
  @Input() store: DataStore = defaultStore;
  @Input()
  target: Target = "district"||"province"||"subdistrict"||"zipcode";
  @Input() autocompleteMaxHeight: number = 200;
  @Input() autocompleteItemCount: number = 5;
  @Input() inputClass: string = '';
  @Input() numbered: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() itemselect = new EventEmitter<AddressModel>();

  possibles: AddressEntry[] = [];
  selectedIndex: number = -1;

  ngOnInit() {
    this.store.setValueProp(this.target, this.value);
    this.store.onValueChange((newModelValue: AddressModel) => {
      const newValue = newModelValue[this.target];
      this.valueChange.emit(newValue);
    });
  }

  get inputType(): string {
    return this.numbered && this.target === 'zipcode' ? 'number' : 'text';
  }

  get containerStyle() {
    return { position: 'relative' };
  }

  get filteredAttrs() {
    return this.pickAllowedAttrs(ALLOWED_ATTRS);
  }

  get inputClassList(): string[] {
    return this.inputClass ? this.inputClass.split(/\s+/) : [];
  }

  search(query: string) {
    if (query.length > 0) {
      this.possibles = getPossibles(this.store.dataSource, this.target, query);
      if (this.possibles.length > 0) {
        this.selectedIndex = 0;
      }
    } else {
      this.clearAutocomplete();
    }
    this.valueChange.emit(query);
  }

  closeAutocomplete() {
    setTimeout(() => this.clearAutocomplete(), AUTOCOMPLETE_CLOSE_DELAY);
  }

  clearAutocomplete() {
    this.selectedIndex = -1;
    this.possibles = [];
  }

  moveUp() {
    if (this.possibles.length > 0) {
      this.selectedIndex = (this.selectedIndex > 0) ? this.selectedIndex - 1 : this.possibles.length - 1;
    }
  }

  moveDown() {
    if (this.possibles.length > 0) {
      this.selectedIndex = (this.selectedIndex + 1) % this.possibles.length;
    }
  }

  pickCurrentItem() {
    const selectedItem = this.possibles[this.selectedIndex];
    if (selectedItem) {
      this.commitItem(selectedItem);
    }
    this.clearAutocomplete();
  }

  commitItem(item: AddressEntry) {
    const addressModel = addressEntryToModel(item);
    this.store.value = addressModel;
    this.itemselect.emit(addressModel);
  }

  private pickAllowedAttrs(attrs: string[]) {
    // Logic to filter attributes (similar to lodash's pick)
    return {}; // Example placeholder logic
  }
}
