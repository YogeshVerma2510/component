import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateAccount from '@salesforce/apex/CreateAccountClass.updateAccount';

export default class UpdateRecordByApex extends LightningElement {

    @api recordId;
    accountName;
    accountRevenue;


    handleNameChange(event){
        this.accountName = event.target.value;
        console.log("AccountName =>" + JSON.stringify(this.accountName));
    }

    handleAnnualRevenue(event){
        this.accountRevenue = event.target.value;
        console.log("AccountRevenue => "+ JSON.stringify(this.accountRevenue));
    }

    handleUpdateAccount(){
        updateAccount({accountId : this.recordId, accountName : this.accountName, accountRevenue : this.accountRevenue})
        .then(account =>{
            this.showToast(account.Name);
            console.log("Account=>"+JSON.stringify(account));
            location.reload(true);
        })
        .catch(error =>{
            console.log(JSON.stringify(error));
        })
    }

    showToast(t){
        const event = new ShowToastEvent({
            title : t,
            message : 'Updated Successfully',
            variant: 'success'
        })
        this.dispatchEvent(event);
    }

}