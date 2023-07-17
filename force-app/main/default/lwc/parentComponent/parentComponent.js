import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {

    handle(){
        this.template.querySelector("c-child-component").handleChange();
    }
}