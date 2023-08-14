import { LightningElement,wire,track } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getData from "@salesforce/apex/getRedditData.getData";
const actions = [
    { label: 'Delete', name: 'delete' },
];
const columns = [
    { label: 'Title', fieldName: 'title__c', type: 'text' },
    { label: 'Author', fieldName: 'author_fullname__c', type: 'text' },
    { label: 'Thumbnail', fieldName: 'thumbnail__c', type: 'text' },
    { label: 'Selftext', fieldName: 'selftext__c', type: 'text' }  , 
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class EliminarAnimales_LWC extends LightningElement {
    data = [];
    columns = columns;
    @wire(getData)
    wiredAccounts({ error, data }) {
        if (data) {
            this.data = data;
        }
    }

    handleRowAction(event){
        const action = event.detail.action;
        const row = event.detail.row;
        this.deleteRow(row.Id);
    }
    
    deleteRow(recordId) {
        deleteRecord(recordId)
            .then(() => {
                this.showToast('Success', 'Account deleted.', 'success');
            })
            .catch(error => {
                this.showToast('Error deleting record', error.body.message, 'error');
            });
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }
       
}