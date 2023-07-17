import { LightningElement, track, wire, api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

//import SaveAssociatedIssueItem from '@salesforce/apex/associatedItem.SaveAssociatedIssueItem';
import DependentAssociatedItems from '@salesforce/apex/associatedItem.DependentAssociatedItems';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import DEPARTMENT_FIELDS from '@salesforce/schema/Issue__c.Department__c';
import ISSUE_OBJECT from '@salesforce/schema/Issue__c';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';
export default class AssociatedItemsLookup extends LightningElement {

    @api DepartmentValue;
    IssueID;


    @api AssociatedItem;
    @track selectedName;
    @track selectedId;
    @track selectedOptionObject
    @track AssociatedItemList = [];
    @track isValueSelected = false;
    @track showSpinner = false;
    @track showDropDown = false;
    @track message = "";
    @track searchTerm;
    //@track searchTerm2;
    handleClick() {
        this.showDropDown = true;
    }
    handleRemovePill() {
        this.isValueSelected = false;
        this.searchTerm = '';
        this.selectedName = '';
        this.selectedId="";
        this.showDropDown = false;
      

    }

    onChange(event) {
        
        this.searchTerm = event.target.value;
       
        if (!this.DepartmentValue) {
            let DependentField = this.template.querySelector('.DepandentField');
            DependentField.reportValidity();
        } else {
            if (this.searchTerm.length > 1) {
                this.showDropDown = true;
                
                this.SearchAssociatedItems();
            } else {
                this.showDropDown = false
            }

        }

    }

    onSelect(event) {
        let selectedId = event.currentTarget.dataset.id;
        this.AssociatedItem = selectedId;
        let selectedName = event.currentTarget.dataset.name;
        let ObjName = event.currentTarget.dataset.objectname;
        this.sPartIdb = event.currentTarget.dataset.id;
      //console.log('selected id'+selectedId);
     //this.sPartIdb = selectedbId;
        this.isValueSelected = true;
        this.selectedName = selectedName;
        this.selectedId = selectedId;
        this.selectedOptionObject = ObjName;

        this.showDropDown = false;

        

    }
    SearchAssociatedItems() {
        this.showSpinner = true
        this.message = '';
        this.AssociatedItemList = [];
        DependentAssociatedItems({ searchText: this.searchTerm, DepartmentValue: this.DepartmentValue })
            .then(result => {
                if (result && result.length > 0) {
                    this.AssociatedItemList = result;

                    console.log(this.AssociatedItemList);
                } else {
                    this.message = "No Record Found";
                }
                this.showSpinner = false
            })
    }

    DepartmentOptions;
    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: DEPARTMENT_FIELDS
      }) DepartmentOptionsPicklist({data,error}){
        if(data){
          this.DepartmentOptions=data.values;
        }
        if(error){
          console.log(JSON.stringify(error));
        }
      }

      handleChange(event) {
        if (event.target.name === 'Department') {
            //if there is change in the department picklist reset the selected Associated items
            this.handleRemovePill();
            this.DepartmentValue = event.target.value;
      }
}

handleReset() {
    this.DepartmentValue = null;
    this.handleRemovePill();
    this.showLoadingSpinner = false;

}

/*createChangeRequest() {
    fields[DEPARTMENT_FIELDS.fieldApiName] = this.DepartmentValue;
    const recordInput = { apiName: ISSUE_OBJECT.objectApiName, fields };


createRecord(recordInput)
            .then(issueResult => {
                //if there is no files dont add
                this.IssueID = issueResult.id;

                SaveAssociatedIssueItem({ SelectedOptionId: this.selectedId, Objectname: this.selectedOptionObject, AssociatedIssueId: this.IssueID })
                    .then(result => {
                        console.log(result)
                       
                    })

                 
     
               
            }).then(v => {
                //after we save the issue save the IssueItems
                
                // this.closeModal();

                refreshApex(this.refreshTable);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Issue Created Successfully!!',
                    variant: 'success'
                }));
                console.log('Issue Id'+this.IssueID);
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: this.IssueID,
                        objectApiName: 'FRGPLM__Issue__c',
                        actionName: 'view'
                    }
                  });
                
            })
            .catch(error => {
                if (error) {
                    console.log(error);
                    this.closeModal();
                    this.dispatchEvent(new ShowToastEvent({
                        title: "Error",
                        message: 'Error Creating the Issue',
                        variant: 'error'
                    }));


                }
            })

}*/
}