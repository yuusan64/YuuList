export class Stickywall{
   constructor(containerID){
    this.stickyWall=document.getElementById(containerID);
    this.draggedNote=null;
    this.modal=this.createModal();
    document.body.appendChild(this.modal.modalContainer);
    this.createAddNoteButton();
    this.createOverlay();
   }

   createAddNoteButton(){
      const addNoteBtn=document.createElement('div');
      addNoteBtn.classList.add('add-note');
      addNoteBtn.textContent='+';
      addNoteBtn.addEventListener('click', () =>this.showModal());
      this.stickyWall.appendChild(addNoteBtn);
   }

   createModal(){
      const container = document.createElement('div');
      container.classList.add('modal');

      const titleInput=document.createElement('input');
      titleInput.type='text';
      titleInput.placeholder='Title';

      const textInput=document.createElement('textarea');
      textInput.placeholder= "Write something...";

      const addButton = document.createElement('button');
      addButton.textContent = 'Add';
      addButton.addEventListener('click', this.addNote);

      container.appendChild(titleInput);
      container.appendChild(textInput);
      container.appendChild(addButton);

      return{ modalContainer: container, titleInput, textInput };
   }

   createOverlay(){
      const overlay= document.createElement('div');
      overlay.classList.add('overlay');
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => this.hideModal(this.modal.modalContainer, overlay));
   }

   addNote(){
      const titleValue=modal.titleInput.value;
      const textValue=modal.textInput.value;

      if(titleValue && textValue){
         const note=this.createNote(titleValue, textValue);
         this.stickyWall.appendChild(note);
         this.hideModal(this.modal.modalContainer, overlay);
      }
   }

   createNote(title, text){
      
      const note = document.createElement('div');
      note.classList.add('note');
      note.draggable=true;

      note.addEventListener('dragstart', ()=>{
         this.draggedNote=note;
      });
      
      //allow dropping by preventing the default handling of the event
      note.addEventListener('dragover',(e)=>{
         e.preventDefault(); 
      });

      note.addEventListener('drop', ()=>{
         
         if(this.draggedNote && this.draggedNote!==note){
            this.swapNotes(this.draggedNote, note);
         }
      });
       
      const titleElement=document.createElement('h3');
      titleElement.textContent=title;
      const textElement = document.createElement('p');
      textElement.textContent=text;
      note.appendChild(titleElement);
      note.appendChild(textElement);

      return note;
   }


   swapNotes(note1, note2){
      const temp=document.createElement('div');
      this.stickyWall.insertBefore(temp,note1); //insert temp before note1
      this.stickyWall.insertBefore(note1,note2); //move note1 before note2
      this.stickyWall.insertBefore(note2, temp); //move note2 before temp element
      this.stickyWall.removeChild(temp); //remove temp element

   }

   showModal(){
      this.modal.modalContainer.style.display='block';
      overlay.style.display='block';

   }

   hideModal(modal, overlay){
      modal.style.display='none';
      overlay.style.display='none';
   }
}

class lists{

}