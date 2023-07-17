import { LightningElement,api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api
    itemName = 'Child component';

    @api
    handleChange(){
        this.itemName = 'inside child function';
    }

}