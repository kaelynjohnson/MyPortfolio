// QualificationForm.jsx - form for adding a new qualification or editing an existing one
// The parent page gives this form a "key", so it starts fresh whenever a different qualification is chosen
import { useState } from 'react';

// Build the starting form values: the qualification's details when editing, or empty when adding
const getStartingForm = (qualification) => ({
  title: qualification ? qualification.title : '',
  description: qualification ? qualification.description || '' : '',
  // The date input needs the format YYYY-MM-DD
  completion:
    qualification && qualification.completion
      ? qualification.completion.slice(0, 10)
      : '',
});

function QualificationForm({ onSave, qualificationToEdit, onCancel }) {
  const [formData, setFormData] = useState(getStartingForm(qualificationToEdit));
  const [formError, setFormError] = useState('');

  // Update the matching field each time the user types
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Check the input, then pass the qualification up to the parent to save
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setFormError('Title is required.');
      return;
    }

    const wasSaved = await onSave(formData);
    if (wasSaved) {
      setFormData(getStartingForm(null));
      setFormError('');
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>{qualificationToEdit ? 'Edit Qualification' : 'Add Qualification'}</h2>

      {formError && <p className="error-message">{formError}</p>}

      <label htmlFor="title">Title</label>
      <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} />

      <label htmlFor="description">Description</label>
      <input id="description" name="description" type="text" value={formData.description} onChange={handleChange} />

      <label htmlFor="completion">Completion Date</label>
      <input id="completion" name="completion" type="date" value={formData.completion} onChange={handleChange} />

      <div className="form-buttons">
        <button type="submit" className="button">
          {qualificationToEdit ? 'Update' : 'Add'}
        </button>
        {qualificationToEdit && (
          <button type="button" className="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}

export default QualificationForm;