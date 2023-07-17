import { LightningElement } from 'lwc';

export default class ParentLwc extends LightningElement {

    countValue=0;

    handlesub(){
        this.countValue--;
    }

    handleadd(){
        this.countValue++;
    }

    handleMulti(event){
        const multiapplynumber = event.detail;
        this.countValue *=multiapplynumber;
    }
}