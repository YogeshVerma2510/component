import { LightningElement,track } from 'lwc';
import getAccount from '@salesforce/apex/GetRecords.getAccount';

export default class LwcCombobox extends LightningElement {
    @track value = '';
    @track arrList = [];

    get options(){
        return this.arrList;
    }

    connectedCallback(){
        getAccount()
        .then(response => {
            let arr = [];
            for(var i=0; i < response.length; i++){
                arr.push({label :response[i].Name , value :response[i].Id})
            }
            this.arrList = arr;
        })
    }

    handleChange(event){
        this.value = event.detail.value;
    }
}