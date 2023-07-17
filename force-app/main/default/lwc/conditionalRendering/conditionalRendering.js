import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    showDetails = false;
    handleChange(event){
        this.showDetails = event.target.checked;
    }

}