import { LitElement, html } from 'lit-element';
import '../mwc-slider-extended';

class DemoExample extends LitElement {
  render(){
    return html`
      <p>Value: ${this.sliderVal}</p>
      <mwc-slider-extended pin step=0.0001 min="0.0122" max="0.0125" value="0.01225" @input="${e=>this.sliderVal=e.target.pinMarkerText}"></mwc-slider-extended>
    `;
  }

  static get properties() {
    return {
      sliderVal: { type: String }
    }
  }

  firstUpdated() {
    super.firstUpdated();
    this.sliderVal = this.shadowRoot.querySelector("mwc-slider-extended").pinMarkerText;
  }
}

customElements.define('demo-example', DemoExample);
