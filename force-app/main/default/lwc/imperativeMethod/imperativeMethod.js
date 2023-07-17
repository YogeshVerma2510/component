import { LightningElement,track } from 'lwc';
import getAccount from '@salesforce/apex/GetRecords.getAccount';
const columns = [
    {
        label : 'Id', fieldName : 'Id'
    },
    {
        label : 'Account Name', fieldName : 'Name'
    },
    {
        label : 'Annual Revenue ' , fieldName : 'AnnualRevenue'
    }
];

export default class ImperativeMethod extends LightningElement {

    @track columns = columns;
    @track data=[];

    connectedCallback(){
        getAccount()
        .then(result =>{
            this.data = result;
        })
        .catch(error =>{
            console.log("error",error);
        })     
    }
}