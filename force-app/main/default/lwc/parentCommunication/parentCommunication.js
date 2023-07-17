import { LightningElement } from 'lwc';

export default class ParentCommunication extends LightningElement {

    startCounter=0;

    handleChange(event){
        this.startCounter = parseInt(event.target.value);

    }

    handleclick(){
        this.template.querySelector('c-child-communication').increaseCount();
    }
}