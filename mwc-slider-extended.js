import { Slider } from '@material/mwc-slider';

export class MwcSliderExtended extends Slider {
  static get properties() {
    return {
      isDecimal: { type: Boolean },
      powDec: { type: Number }
    }
  }

  constructor() {
    super();
    this.isDecimal = false;
    this.powDec = 0;
  }

  firstUpdated() {
    super.firstUpdated();
    if (this.countDecimals(this.min) > 0 || this.countDecimals(this.max) > 0 || this.countDecimals(this.step) > 0 || this.countDecimals(this._value) > 0) {
      this.isDecimal = true;
      // Find the maximum of decimal length
      let maxDec = Math.max(...[this.countDecimals(this.min), this.countDecimals(this.max), this.countDecimals(this.step), this.countDecimals(this._value)]);
      // Scale up number to get rid the floating content
      this.powDec = Math.pow(10, maxDec);
      this.min *= this.powDec;
      this.max *= this.powDec;
      this.step *= this.powDec;
      this._value *= this.powDec;
    }
  }

  set value(value) {
    if (this.mdcFoundation) {
        this.mdcFoundation.setValue(value);
    }
    this._value = value;
    this.requestUpdate('value', value);
  }

  /** 
   * Override the static value to adjust the pinMarkerText if the slider contains floating steps
   */
  get value() {
    if (this.isDecimal) {
      this.pinMarkerText = '' + Number(this._value) / this.powDec;
    } else {
      this.pinMarkerText = '' + Number(this._value);
    }
    if (this.mdcFoundation) {
        return this.mdcFoundation.getValue();
    }
    else {
        return this._value;
    }
  }

  /** Counting the length of decimal points */
  countDecimals(value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
  }
}

customElements.define('mwc-slider-extended', MwcSliderExtended);
