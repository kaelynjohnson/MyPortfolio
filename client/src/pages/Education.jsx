// Education.jsx - education page; loads qualifications from the database,
// and lets an admin add, edit, and delete them
import { useState, useEffect } from 'react';
import { apiRequest } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import QualificationForm from '../components/QualificationForm.jsx';

function Education() {
  const { user, isAdmin } = useAuth();
  const [qualifications, setQualifications] = useState([]);
  const [qualificationToEdit, setQualificationToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Load the qualifications once when the page first appears
  useEffect(() => {
    apiRequest('/api/qualifications')
      .then((data) => setQualifications(data))
      .catch((error) => setErrorMessage(error.message));
  }, []);

  // Fetch the qualifications again after an add, edit, or delete
  const refreshQualifications = async () => {
    const data = await apiRequest('/api/qualifications');
    setQualifications(data);
  };

  // Add a new qualification, or update the one being edited, then refresh the list
  const saveQualification = async (formData) => {
    const isEditing = qualificationToEdit !== null;
    // The model also needs a name and email, so the signed-in admin's details are used
    const nameParts = user.name.split(' ');
    const qualificationData = {
      ...formData,
      firstname: nameParts[0],
      lastname: nameParts.slice(1).join(' ') || nameParts[0],
      email: user.email,
    };

    try {
      if (isEditing) {
        await apiRequest(`/api/qualifications/${qualificationToEdit._id}`, 'PUT', qualificationData);
      } else {
        await apiRequest('/api/qualifications', 'POST', qualificationData);
      }
      await refreshQualifications();
      setQualificationToEdit(null);
      setErrorMessage('');
      return true;
    } catch (error) {
      setErrorMessage(error.message);
      return false;
    }
  };

  // Delete a qualification by id, then refresh the list
  const deleteQualification = async (qualificationId) => {
    try {
      await apiRequest(`/api/qualifications/${qualificationId}`, 'DELETE');
      if (qualificationToEdit && qualificationToEdit._id === qualificationId) {
        setQualificationToEdit(null);
      }
      await refreshQualifications();
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Turn a saved date into a readable month and year
  const formatDate = (dateText) =>
    new Date(dateText).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    });

  return (
    <section className="education">
      <h1>Education</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Only admins see the add/edit form; the key resets it when a different item is chosen */}
      {isAdmin && (
        <QualificationForm
          key={qualificationToEdit ? qualificationToEdit._id : 'new'}
          onSave={saveQualification}
          qualificationToEdit={qualificationToEdit}
          onCancel={() => setQualificationToEdit(null)}
        />
      )}

      <div className="education-list">
        {qualifications.length === 0 ? (
          <p>No qualifications added yet.</p>
        ) : (
          qualifications.map((qualification) => (
            <article className="education-card" key={qualification._id}>
              <h2>{qualification.title}</h2>
              <p>{qualification.description}</p>
              {qualification.completion && (
                <p>Completion: {formatDate(qualification.completion)}</p>
              )}
              {/* Only admins see the edit and delete buttons */}
              {isAdmin && (
                <div className="card-buttons">
                  <button type="button" className="button" onClick={() => setQualificationToEdit(qualification)}>
                    Edit
                  </button>
                  <button type="button" className="button" onClick={() => deleteQualification(qualification._id)}>
                    Delete
                  </button>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Education;