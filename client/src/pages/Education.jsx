// Education.jsx - education page listing my qualifications with the program, school, and dates
// List of education entries; each one is displayed as a card below
const educationList = [
  {
    program: 'Advanced Diploma in Artificial Intelligence - Software Engineering Technology',
    school: 'Centennial College',
    dates: 'In progress, expected completion 2028',
    details: 'A 3-year program where I am building my knowledge and qualifications in software engineering and AI.',
  },
];

function Education() {
  return (
    <section className="education">
      <h1>Education</h1>

      <div className="education-list">
        {educationList.map((entry) => (
          <article className="education-card" key={entry.program}>
            <h2>{entry.program}</h2>
            <p><strong>{entry.school}</strong></p>
            <p>{entry.dates}</p>
            <p>{entry.details}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Education;