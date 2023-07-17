import { LightningElement } from 'lwc';

export default class DataBindingQueryAll extends LightningElement {

    firstName='';
    lastName='';

    handleClick(){
        var input = this.template.querySelectorAll('lightning-input');

        input.forEach(function(element){
            if(element.name == "fname")
            this.firstName = element.value;
            else if(element.name == "lname")
            this.lastName = element.value;
        },this)

    }





}