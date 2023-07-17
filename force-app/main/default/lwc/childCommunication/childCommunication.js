import { LightningElement,api } from 'lwc';

export default class ChildCommunication extends LightningElement {
    @api counter = 0;

    @api
    increaseCount(){
        this.counter +=100;
    }
}