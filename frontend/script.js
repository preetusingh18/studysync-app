console.log("StudySync Working!");// Search Function
document.getElementById('searchInput').addEventListener('input', function() {
  let filter = this.value.toLowerCase();
  let notes = document.querySelectorAll('.note-card');
  notes.forEach(note => {
    let text = note.innerText.toLowerCase();
    if (text.includes(filter)) {
      note.style.display = "";
    } else {
      note.style.display = "none";
    }
  });
});
