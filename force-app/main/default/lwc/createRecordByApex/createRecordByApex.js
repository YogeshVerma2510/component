import { LightningElement} from 'lwc';

import createAccount from '@salesforce/apex/CreateAccountClass.createAccount';

export default class CreateRecordByApex extends LightningElement {


    accountId;
    accountName;
    accountIndustry;


    handleAccountName(event){
        this.accountName = event.target.value;

    }

    handleAccountIndustry(event){
        this.accountIndustry = event.target.value;

    }
    createAccountRecord(){
        createAccount({accName : this.accountName, accIndustry : this.accountIndustry})
        .then(result =>{
            this.accountId = result.Id;

        })
        .catch(error => {
            console.error("Error" +JSON.stringify(error));
        })   
    }

}