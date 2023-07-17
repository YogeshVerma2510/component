import { LightningElement } from 'lwc';

export default class DataBindQueryMethid extends LightningElement {

    greeting = 'Yogi';
    handleClick(event){
        this.greeting = this.template.querySelector("lightning-input").value;
        console.log(this.greeting);
    }


}