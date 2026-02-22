const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note)
      return res.status(404).json({ message: "Note not found" });

    if (note.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note)
      return res.status(404).json({ message: "Note not found" });

    if (
      note.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    )
      return res.status(403).json({ message: "Forbidden" });

    await note.deleteOne();

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};