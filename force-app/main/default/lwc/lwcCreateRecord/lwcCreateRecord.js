import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import Account_OBJ from '@salesforce/schema/Account';
import Name_FIELD from '@salesforce/schema/Account.Name';

export default class LwcCreateRecord extends LightningElement {
    accountId;
    accountName;

    handlechange(event){
        this.accountName = event.target.value;
    }

    handleClick(){
        const fields = {};
        fields[Name_FIELD.fieldApiName] = this.accountName;

        const recordInput = { apiName : Account_OBJ.objectApiName , fields};
        createRecord(recordInput)
        .then(account =>{
            this.accountId = account.id;
            this.showToast();
        })
        .catch(error =>{
            console.log("Error",error);
        })
    }

    showToast(){
        const event = new ShowToastEvent({
            title : this.accountName,
            message : 'Account created Successfully',
            variant : 'success'
        });
        this.dispatchEvent(event);
    }



}