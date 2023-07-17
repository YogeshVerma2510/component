import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Showtoast extends LightningElement {
    myName = 'Yogesh Verma';

    handleClick(){
        this.showToast(this.myName);
    }

    showToast(t){
        const event = new ShowToastEvent({
            title : t,
            message : 'Event is added successfully',
            variant: 'error'
        });
        this.dispatchEvent(event);

    }

}