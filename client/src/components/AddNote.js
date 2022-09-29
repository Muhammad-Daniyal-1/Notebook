import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setnote] = useState({title:"", description:"", tag:""})

  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setnote({title:"", description:"", tag:""})
  }

  const onChange = (e)=>{
    setnote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <h1>Add New Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="descrription"
            name="description"
            value={note.description}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="TAG" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button disabled={note.title.length<5 || note.description.length<6} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
