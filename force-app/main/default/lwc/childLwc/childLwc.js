import { LightningElement } from 'lwc';

export default class ChildLwc extends LightningElement {

    handleSubtract(){
        this.dispatchEvent(new CustomEvent('subtract'));
    }

    handleAdd(){
        this.dispatchEvent(new CustomEvent('add'));
    }

    handleMultiply(event){
        const multiplyvalue = event.target.value;
        this.dispatchEvent(new CustomEvent('multiply',{detail: multiplyvalue}));
    }


}