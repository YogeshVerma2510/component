import { LightningElement,track,wire } from 'lwc';
import getAccount from '@salesforce/apex/GetRecords.getAccount';

export default class GetData extends LightningElement {
    @track columns =[
        {label:'Name' , fieldName:'Name',type:URL, typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}},
        {label: 'ID', fieldName:'Id'},
        {label: 'Annual Revenue', fieldName:'AnnualRevenue'}
    ]
       
    accountList;
    @wire(getAccount) wiredAccount({data,error}){
        if(data){
            this.accountList = data;
            console.log('data ==>', data);
        }
        else{
            console.log('Error ==>',error);
        }
    }


}