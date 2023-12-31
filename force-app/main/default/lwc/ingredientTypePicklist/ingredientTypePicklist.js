import { LightningElement,api,track,wire } from 'lwc';

export default class IngredientTypePicklist extends LightningElement {
  

    object='Supplier_Ingredient__c';
    field='Ingredient_Type__c';
    @track type;
    handleChange(event) {
      // Creates the event
      this.type = event.target.value;
      const selectedEvent = new CustomEvent('valueselected', {
        detail: this.type
      });
      //dispatching the custom event
      this.dispatchEvent(selectedEvent);
    }
    // check validity to be used in newProjectPOpup
    @api
    isValid() {
      var val = true;
      var input = this.template.querySelector('lightning-input-field');
      if (this.required && !input.value) {
        input.reportValidity();
        val = false;
      }
      return val;
    }
  
    // reset field to be used in newProjectPOpup
    @api
    resetLookup(event) {
      this.template.querySelector('lightning-input-field').value = null;
    }
}