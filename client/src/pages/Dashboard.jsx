import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: null, title: "", content: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!token) {
        console.error("No authentication token found");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:4000/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setIsLoading(false);
        toast.error("Failed to load notes. Please try again.");
      }
    };

    fetchNotes();
  }, [token]);

  const handleCreateOrUpdateNote = async () => {
    if (!currentNote.title.trim()) {
      toast.warning("Please enter a title for your note");
      return;
    }
    
    try {
      if (isEditMode) {
        // Update Note
        await axios.put(`http://localhost:4000/api/notes/${currentNote.id}`, 
          { title: currentNote.title, content: currentNote.content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotes(notes.map((note) => (note.id === currentNote.id ? currentNote : note)));
        toast.success("Note updated successfully!");
      } else {
        // Create Note
        const response = await axios.post("http://localhost:4000/api/notes", currentNote, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes([...notes, response.data]);
        toast.success("Note created successfully!");
      }
      
      setIsModalOpen(false);
      setCurrentNote({ id: null, title: "", content: "" });
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note. Please try again.");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note.id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note. Please try again.");
    }
  };

  const openEditModal = (note) => {
    setCurrentNote(note);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  // Format the date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate content if it's too long
  const truncateContent = (content, maxLength = 100) => {
    if (!content) return ''; // Handle null or undefined content
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Notes</h1>
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transform transition duration-300 hover:scale-105 flex items-center"
            onClick={() => {
              setIsEditMode(false);
              setCurrentNote({ id: null, title: "", content: "" });
              setIsModalOpen(true);
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Create Note
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : notes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No notes yet</h2>
            <p className="text-gray-500 mb-6">Create your first note to get started!</p>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => {
                setIsEditMode(false);
                setCurrentNote({ id: null, title: "", content: "" });
                setIsModalOpen(true);
              }}
            >
              Create Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note.id || `note-${Math.random()}`} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
                  <p className="text-gray-600 mb-4 h-20 overflow-hidden">{truncateContent(note.content)}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{note.updated_at ? formatDate(note.updated_at) : 'No date'}</span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditModal(note)} 
                        className="text-blue-500 hover:text-blue-700 transition duration-300 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteNote(note.id)} 
                        className="text-red-500 hover:text-red-700 transition duration-300 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              {isEditMode ? "Edit Note" : "Create New Note"}
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter note title"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  id="content"
                  placeholder="Enter note content"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-h-[150px]"
                  value={currentNote.content}
                  onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition duration-300"
                onClick={handleCreateOrUpdateNote}
              >
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