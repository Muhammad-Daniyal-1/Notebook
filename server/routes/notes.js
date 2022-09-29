const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1:  fetch all notes "/api/notes/fetchallnotes" by get method. login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//ROUTE 2:  add notes "/api/notes/addnote" by post method. login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "minimun 3 letters require").isLength({ min: 3 }),
    body("description", "atleast 6 characters are required").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if error occurs return bad request and also errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);


//ROUTE 3:  update notes "/api/notes/updatenote" by put method. login required
router.put(
  "/updatenote/:id", fetchuser, async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //create a newnote object 
      const newNote = {};
      if(title){newNote.title = title}
      if(description){newNote.description = description}
      if(tag){newNote.tag = tag}

      // Find the note to be updated and update it 
      let note = await Notes.findById(req.params.id);
      if(!note){
        res.status(404).send("Not Found")
      }
      //check user update his notes or not 
      if(note.user.toString() !== req.user.id){
        res.status(401).send("Not Allowed")
      }

      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
      res.json(note);
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);


//ROUTE 3:  delete notes "/api/notes/deletenote" by delete method. login required
router.delete(
  "/deletenote/:id", fetchuser, async (req, res) => {
    try {

      // Find the note to be deleted and delete it 
      let note = await Notes.findById(req.params.id);
      if(!note){
        res.status(404).send("Not Found")
      }
      //check user update his notes or not 
      if(note.user.toString() !== req.user.id){
        res.status(401).send("Not Allowed")
      }

      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ "Success": "note is deleted" });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);



module.exports = router;
