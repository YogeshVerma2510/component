import { LightningElement } from 'lwc';

export default class InputExample extends LightningElement {

    phoneNumber=0;
    emailId;
    handlePhone(event){
        this.phoneNumber = event.target.value;

    }

    handleEmail(event){
        this.emailId = event.target.value;
    }

    handleClick(){
        window.alert(this.emailId);
        window.alert(this.phoneNumber);
    }
}