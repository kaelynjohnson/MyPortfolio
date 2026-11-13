// Projects.jsx - projects page; loads projects from the database,
// and lets an admin add, edit, and delete them
import { useState, useEffect } from 'react';
import { apiRequest } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import ProjectForm from '../components/ProjectForm.jsx';

function Projects() {
  const { user, isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Load the projects once when the page first appears
  useEffect(() => {
    apiRequest('/api/projects')
      .then((data) => setProjects(data))
      .catch((error) => setErrorMessage(error.message));
  }, []);

  // Fetch the projects again after an add, edit, or delete
  const refreshProjects = async () => {
    const data = await apiRequest('/api/projects');
    setProjects(data);
  };

  // Add a new project, or update the one being edited, then refresh the list
  const saveProject = async (formData) => {
    const isEditing = projectToEdit !== null;
    // The model also needs a name and email, so the signed-in admin's details are used
    const nameParts = user.name.split(' ');
    const projectData = {
      ...formData,
      firstname: nameParts[0],
      lastname: nameParts.slice(1).join(' ') || nameParts[0],
      email: user.email,
    };

    try {
      if (isEditing) {
        await apiRequest(`/api/projects/${projectToEdit._id}`, 'PUT', projectData);
      } else {
        await apiRequest('/api/projects', 'POST', projectData);
      }
      await refreshProjects();
      setProjectToEdit(null);
      setErrorMessage('');
      return true;
    } catch (error) {
      setErrorMessage(error.message);
      return false;
    }
  };

  // Delete a project by id, then refresh the list
  const deleteProject = async (projectId) => {
    try {
      await apiRequest(`/api/projects/${projectId}`, 'DELETE');
      if (projectToEdit && projectToEdit._id === projectId) {
        setProjectToEdit(null);
      }
      await refreshProjects();
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
    <section className="projects">
      <h1>My Projects</h1>
      <p className="projects-intro">
        I'm still early in my learning and have a ways to go with programming.
        I'm using AI and technology to enhance my future projects and keep
        growing my skills.
      </p>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Only admins see the add/edit form; the key resets it when a different item is chosen */}
      {isAdmin && (
        <ProjectForm
          key={projectToEdit ? projectToEdit._id : 'new'}
          onSave={saveProject}
          projectToEdit={projectToEdit}
          onCancel={() => setProjectToEdit(null)}
        />
      )}

      <div className="project-grid">
        {projects.length === 0 ? (
          <p>No projects added yet.</p>
        ) : (
          projects.map((project) => (
            <article className="project-card" key={project._id}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              {project.completion && (
                <p><strong>Completed:</strong> {formatDate(project.completion)}</p>
              )}
              {/* Only admins see the edit and delete buttons */}
              {isAdmin && (
                <div className="card-buttons">
                  <button type="button" className="button" onClick={() => setProjectToEdit(project)}>
                    Edit
                  </button>
                  <button type="button" className="button" onClick={() => deleteProject(project._id)}>
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

export default Projects;