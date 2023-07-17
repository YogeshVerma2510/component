import { LightningElement, track } from 'lwc';
import getAcc from '@salesforce/apex/lwcDatatable.getAcc';
import getCon from '@salesforce/apex/lwcDatatable.getCon';
const columns = [{label : "Record Id" , fieldName : 'Id'},
                 {label : "Name " , fieldName : 'Name'},
                 {label : "Email" , fieldName : 'Email'}];

export default class LwcComboBoxDatatable extends LightningElement {
    @track value ='';
    @track arrList = [];
    @track visibleData = false;
    @track columns = columns;
    @track data = [];

    // This will load the account
    connectedCallback(){
        getAcc()
        .then(response =>{
            let arr = [];
            for(var i=0; i<response.length; i++){
                arr.push({label : response[i].Name , value : response[i].Id})
            }
            this.arrList = arr;
        })

    }
    handleChange(event){
        this.value = event.detail.value;
        // window.alert(this.value);
        this.visibleData = true;
        getCon({accountId : this.value})
        .then(response =>{
            this.data = response;
        })
        .catch(error =>{
            console.log("Error" , error);
        })

    }
    get options(){
        return this.arrList;
    }
}