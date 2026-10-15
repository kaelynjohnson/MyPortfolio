// Projects.jsx - projects page showing three past projects with an image, my role, and the outcome
import ctrlClutchLogo from '../assets/ctrl-clutch-logo.png';
import cgiProject from '../assets/cgi-project.png';
import collegeApp from '../assets/college-app.png';

// List of projects; each one is displayed as a card below
const projectList = [
  {
    title: 'CTRL+ Clutch Logo',
    image: ctrlClutchLogo,
    imageAlt: 'CTRL+ Clutch logo design',
    role: 'Designer. I created this logo just for fun, imagining a brand for a sports company.',
    outcome: 'A bold, original logo that helped me practice branding and design ideas.',
  },
  {
    title: 'CGI Web Page',
    image: cgiProject,
    imageAlt: 'Screenshot of my CGI web page',
    role: 'Developer. I built an HTML web page about CGI as a school project.',
    outcome: 'A finished page that taught me the basics of structuring and presenting content on the web.',
  },
  {
    title: 'College Application Letter Request Form',
    image: collegeApp,
    imageAlt: 'Screenshot of my college application letter request form',
    role: 'Developer. I created a letter request form for a college application as a school project.',
    outcome: 'A working form layout that gave me hands-on practice collecting user information.',
  },
];

function Projects() {
  return (
    <section className="projects">
      <h1>My Projects</h1>
      <p className="projects-intro">
        I'm still early in my learning and have a ways to go with programming.
        I'm using AI and technology to enhance my future projects and keep
        growing my skills.
      </p>

      <div className="project-grid">
        {projectList.map((project) => (
          <article className="project-card" key={project.title}>
            <img src={project.image} alt={project.imageAlt} />
            <h2>{project.title}</h2>
            <p><strong>My role:</strong> {project.role}</p>
            <p><strong>Outcome:</strong> {project.outcome}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;