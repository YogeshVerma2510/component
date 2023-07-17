import { LightningElement, api } from 'lwc';
//import getObjectApiName from '@salesforce/apex/getObjectApiName.objApiName';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class CustomCancelBtn extends NavigationMixin(LightningElement) {
    customurl;
    a_Record_URL;
    @api RecordId;

    handleNavigation(){
        this.a_Record_URL = window.location.origin;
        console.log('Object Api Name',this.objectApiName);

        this.customurl = this.a_Record_URL +'/lightning/o/Requirement__c/list?filterName=Recent';
        
        console.log('a_Record_URL:',this.a_Record_URL);
        console.log('this.customurl',this.customurl);

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Requirement__c',
                actionName: 'list',
            },
            state: {       
                filterName: 'Recent' 
            }
        });
        if(this.RecordId != null) {
            deleteRecord(this.RecordId)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Record deleted',
                            variant: 'success'
                        })
                    );
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error deleting record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
            }
    }
    }