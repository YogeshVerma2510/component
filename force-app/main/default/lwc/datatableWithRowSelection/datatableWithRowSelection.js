import { LightningElement,track,api,wire } from 'lwc';
import getCon from '@salesforce/apex/GetAccount.getCon';
const columns =[
    {label : 'Record ID', fieldName : 'Id'},
    {label : 'Name', fieldName : 'Name'}
];

export default class DatatableWithRowSelection extends LightningElement {
    columns = columns;
    @track showContact = 'Show Contact';
    @track showCard = false;
    @track data=[];
    @api searchKey = '';
    @api recordId;

    // To get Contact of related Account
    connectedCallback(){
        getCon({accountId:this.recordId})
        .then(response=>{
            this.data=response;
        })
        .catch(error=>{
            console.log(error);
        })
    }
    
    

    handleSearch(event){
        this.searchKey = event.target.value;
        getCon({searchKey : this.searchKey, accountId : this.recordId})
        .then(res =>{
            this.data = res;
            console.log("Inside the searchkey method");
        })
        .catch(err=>{
            console.log("Error",err);
        })
    }


    handleClick(event){
        const showLabel = event.target.label;
        if(showLabel === 'Show Contact'){
            this.showContact = 'Hide Contact';
            this.showCard = true;
            
        }
        else if(showLabel === 'Hide Contact'){
            this.showContact = 'Show Contact';
            this.showCard = false;
        }
    }

}