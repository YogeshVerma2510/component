import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from "@salesforce/apex"
import getUser from '@salesforce/apex/getAssigneesValue.getUsers';
import requirementSourcescls from '@salesforce/apex/RequirementAssigneeList.getAssigneeDetails';
import deleteAssignee from '@salesforce/apex/RequirementAssigneeList.deleteAssignee';
// import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import addAssignees from '@salesforce/apex/getAssigneesValue.addassignees';
export default class addAssignee extends NavigationMixin(LightningElement) {
    
modal = false;
assigne=false;
refresh;
assigneeId; 
RemoveButton = true;
@track RefreshTable=[];
@api recordId;
    @track modal = false;

    open() {
        this.modal = true;
      }
      close() {
        this.modal = false; 
        this.isValueSelected = false;
        this.searchTerm = '';
        this.selectedName = '';
        this.selectedId = "";
        this.showDropDown = false;
      }   
    
    @track assigneeName;
    @track assigneeRecId;
    @track UserList;
    @track searchKey = "";
    @track isValueSelected = false;
    @track showSpinner = false;
    @track showDropDown = false;
    @track message = "";

  @track searchTerm;

  refreshTable(){
    refreshApex(this.RefreshTable)
}
  
  handleClick() {
    this.showDropDown = true;
  }

  handleRemovePill() {
    this.isValueSelected = false;
    this.searchTerm = '';
    this.selectedName = '';
    this.selectedId = "";
    this.showDropDown = false;

  }

  onChange(event) {
    this.searchTerm = event.target.value;

    if (this.searchTerm.length > 1) {
      this.showDropDown = true;
      this.SearchUser();
    } else {
      this.showDropDown = false
    }

  }

  onSelect(event) {
    let selectedId = event.currentTarget.dataset.id;
    let selectedName = event.currentTarget.dataset.name;
    this.isValueSelected = true;
    this.assigneeName = selectedName;
    this.assigneeRecId = selectedId;

    this.showDropDown = false;
  }

  SearchUser() {
    this.showSpinner = true
    this.message = '';
    this.UserList = [];
    getUser({ userName: this.searchTerm })
      .then(result => {
        if (result && result.length > 0) {
          this.UserList = result;
          console.log(this.UserList);
        } else {
          this.message = "No Record Found";
        }
        this.showSpinner = false
      })
  }

saveClick(){
    console.log('this.recordId', this.recordId);
    console.log('this.selectedId', this.selectedId);
    console.log('this.assigneeRecId', this.assigneeRecId);


        
    addAssignees({
        
        reqID: this.recordId,
        insertId: this.assigneeRecId
    })
    .then(() => {
      // refreshApex(this.refresh);

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Assignee Added Successfully',
                variant: 'success'
            }));
          
            this.modal = false;
            this.isValueSelected = false;
            this.searchTerm = '';
            this.selectedName = '';
            this.selectedId = "";
            this.showDropDown = false;

            refreshApex(this.refreshDataTable);
    })
    .catch((e) => {
        console.log(JSON.stringify(e));
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error Saving record',
                message: e.body.message,
                variant: 'error',
            }),
        );
       
    })
    .finally(() => {

        //window.location.reload();
    })
}
// tableData;
@track results = [];
refreshDataTable;
    @wire(requirementSourcescls, {recordId:'$recordId'})
     resData(result) {
      this.refreshDataTable = result;
        console.log('Enter inside method');
        if (result.data) {
            this.results = result.data;
        }
        else if(result.error) {
            console.error(error);
        }
    }
    viewTabledata1(event) {

        const recordId = event.target.dataset.id;
        console.log('Ids' + recordId);
        console.log("navigation" + recordId);
        this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
        actionName: "view",
        recordId: recordId
    
    
        }
        });
        // refreshApex(this.refresh);
        refreshApex(this.viewTabledata1Refresh)

        }

        recordIds = [];
        userIds = [];
        // parentId;
        assigneeId;

        handleCheckbox(event) {
      //     let boxes = this.template.querySelectorAll("lightning-input[data-my-id=checkboxes]");
      //     let currentBox = event.target.name;
          // this.assigneeId = event.target.dataset.recordIds;
      //     this.recordId = event.target.dataset.id;
      //     this.parentId = event.target.dataset.parent;
      //     // this.parentId = event.target.dataset.id;
      //     // this,addAssignees = event.target.dataset.id;
      //     Array.from(this.template.querySelectorAll('lightning-input'))
      //     .forEach(element => {
      //         element.checked = false;
      //     });
      // const checkbox = this.template.querySelector('lightning-input[data-value="' + event.target.dataset.value + '"]');
      // checkbox.checked = true;

      // if (event.target.checked == true) {
      //     this.RemoveButton = false;
      // }
      // else if
      //     (event.target.checked == false) {
      //     this.RemoveButton = true;
      // }
      // for (let i = 0; i < boxes.length; i++) {
      //   let box = boxes[i];
      //   if (box.name !== currentBox && box.checked) {
      //       box.checked = false;
      //   }
      this.recordIds=event.target.dataset.recid;
      this.userIds = event.target.dataset.id;
      this.selectedId = event.target.dataset.id;
      console.log('this.recordIds',this.recordIds);
      console.log('this.userIds',this.userIds);
      console.log('this.selectedId',this.selectedId);
      Array.from(this.template.querySelectorAll('lightning-input'))
          .forEach(element => {
              element.checked = false;
          });
      const checkbox = this.template.querySelector('lightning-input[data-value="' + event.target.dataset.value + '"]');
      checkbox.checked = true;

      if (event.target.checked == true) {
          this.RemoveButton = false;
      }
      else if
          (event.target.checked == false) {
          this.RemoveButton = true;
          }
      console.log('testing'+this.selectedId, "test1" + this.recordIds);
        }
        
        handleRemove(event){
          console.log('Ids' + this.recordIds);
          // const recordIds = event.target.dataset.recordIds;
          deleteAssignee({recordIds: this.recordIds, userIds:this.userIds})
            .then(() => {
              // this.closeDeleteModal();
              // refreshApex(this.refresh)
              console.log('deleteAssigne' + this.recordIds);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Assignee deleted Successfully',
                        variant: 'success'
                    })
                )
                //this.openModal = false;
                // refreshApex(this.tableData)

            })
            .catch(error => {
                console.log(JSON.stringify(error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting user',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
                //this.openModal = false;
                console.log(error);
            })
        // history.go(0);
        location.reload(true);
    }
    
     
 
  //   @api currentRecordId;
  //   handleRemove(){
  //     deleteAssignee(this.currentRecordId)
  //     .then(() => {
  //         return refreshApex(this.refresh);
  //     })
  //     .catch((error) => {
  //        this.error=error;
  //        console.log('unable to delete the record due to'+JSON.stringify(this.error));
  //     });
  // }
}