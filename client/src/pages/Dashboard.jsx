import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: null, title: "", content: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      try {
        const response = await axios.get("http://localhost:4000/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [token]);

  const handleCreateOrUpdateNote = async () => {
    try {
      if (isEditMode) {
        // Update Note
        await axios.put(`http://localhost:4000/api/notes/${currentNote.id}`, 
          { title: currentNote.title, content: currentNote.content }, // Send only title and content
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotes(notes.map((note) => (note.id === currentNote.id ? currentNote : note)));
      } else {
        // Create Note
        const response = await axios.post("http://localhost:4000/api/notes", currentNote, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes([...notes, response.data]);
      }
      
      setIsModalOpen(false);
      setCurrentNote({ id: null, title: "", content: "" });
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const openEditModal = (note) => {
    setCurrentNote(note);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Your Notes</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={() => {
          setIsEditMode(false);
          setCurrentNote({ id: null, title: "", content: "" });
          setIsModalOpen(true);
        }}
      >
        Create Note
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 shadow-md rounded-md bg-white relative">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <p className="text-gray-600">{note.content}</p>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button onClick={() => openEditModal(note)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDeleteNote(note.id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Note" : "Create New Note"}</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded mb-2"
              value={currentNote.title}
              onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
            />
            <textarea
              placeholder="Content"
              className="w-full p-2 border rounded mb-2"
              value={currentNote.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleCreateOrUpdateNote}>
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
