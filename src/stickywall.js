export class Stickywall{
   constructor(mainContent, containerId){
      this.modal = this.createModal();
      this.overlay=this.createOverlay();
      this.stickyWall = document.createElement('div');
      this.stickyWall.id=containerId;
      this.draggedNote = null;
     
      this.createAddNoteButton(mainContent);
      mainContent.appendChild(this.stickyWall);
      document.body.appendChild(this.modal.modalContainer);
      document.body.appendChild(this.overlay);
      this.loadNotes();
      
      
   }

   createAddNoteButton(mainContent){
      const addNoteBtn=document.createElement('div');
      addNoteBtn.classList.add('add-note');
      addNoteBtn.textContent='+';
      addNoteBtn.addEventListener('click', () =>this.showModal());
      mainContent.appendChild(addNoteBtn);
   }

   createModal() {
      const container = document.createElement('div');
      container.classList.add('sticky-modal');
  
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.placeholder = 'Title';
  
      const textInput = document.createElement('textarea');
      textInput.placeholder = "Write something...";
  
      const addButton = document.createElement('button');
      addButton.textContent = 'Add';
      addButton.addEventListener('click', this.addNote.bind(this)); // Bind this
  
      container.appendChild(titleInput);
      container.appendChild(textInput);
      container.appendChild(addButton);
  
      this.modal = { modalContainer: container, titleInput, textInput }; // Assign to this.modal
      return this.modal;
  }

   createOverlay(){
      const overlay= document.createElement('div');
      overlay.classList.add('overlay');
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => this.hideModal(this.modal.modalContainer, overlay));
      return overlay;
   }

   addNote(){

      if (!this.modal || !this.modal.titleInput || !this.modal.textInput) {
         console.error("Modal is not initialized properly.");
         return;
     }
 
     const titleValue = this.modal.titleInput.value;
     const textValue = this.modal.textInput.value;
 
     if (titleValue && textValue) {
         const note = this.createNote(titleValue, textValue);
         
         this.stickyWall.appendChild(note);
         this.hideModal(this.modal.modalContainer, this.overlay);
     }

     this.saveNotes();
 }

 saveNotes(){
   let noteData=[];
   this.stickyWall.querySelectorAll('.note').forEach(note => {
      const title= note.querySelector('h3').textContent;
      const text=note.querySelector('p').textContent;
      noteData.push({title, text});
   });
   localStorage.setItem('stickyNotes', JSON.stringify(noteData));
 }
 
 loadNotes(){
   const notesData = JSON.parse(localStorage.getItem('stickyNotes')) || [];
   notesData.forEach(noteData => {
       const note = this.createNote(noteData.title, noteData.text);
       this.stickyWall.appendChild(note);
   });
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

      const removeButton=document.createElement('button');
      removeButton.textContent='X';
      removeButton.classList.add('remove-note');
      removeButton.addEventListener('click', ()=>{
         note.remove();
         this.saveNotes();
      })

      note.appendChild(titleElement);
      note.appendChild(textElement);
      note.appendChild(removeButton); 

      return note;
   }


   swapNotes(note1, note2){
      const temp=document.createElement('div');
      this.stickyWall.insertBefore(temp,note1); //insert temp before note1
      this.stickyWall.insertBefore(note1,note2); //move note1 before note2
      this.stickyWall.insertBefore(note2, temp); //move note2 before temp element
      this.stickyWall.removeChild(temp); //remove temp element
      
      this.saveNotes();
   }

   showModal(){
      this.modal.titleInput.value='';
      this.modal.textInput.value='';

      this.modal.modalContainer.style.display='block';
      this.overlay.style.display='block';

   }

   hideModal(modal, overlay){
      modal.style.display='none';
      overlay.style.display='none';
   }
}

