import { LightningElement,track } from 'lwc';

export default class ConditionalStatement extends LightningElement {
    @track label = 'Show';
    @track showCard = false;
    @track variant = 'brand';
    
    handleClick(event){
        const test = event.target.label;
        const var1 = event.target.variant;
        if(test === 'Show' && var1 === 'brand'){
            this.label = 'Hide';
            this.showCard = true;
            this.var1 = 'neutral'
        }
        else{
            this.label = 'Show';
            this.showCard = false;
            this.var1 = 'brand';
        }
    }

}