// About.jsx - about me page with my name, photo, short bio, and a link to my resume PDF
import profileImage from '../assets/profile.png';

function About() {
  return (
    <section className="about">
      <h1>About Me</h1>

      <div className="about-content">
        <img
          src={profileImage}
          alt="Kaelyn Johnson headshot"
          className="profile-image"
        />

        <div className="about-text">
          <h2>Kaelyn Johnson</h2>
          <p>
            Hi, I'm Kaelyn! I'm a student at Centennial College with a
            background in manufacturing and customer service. I love solving
            problems and working with people, and I use my school projects to
            build my skills. I'm looking to gain real-world experience, and in
            my spare time I have fun with home projects, trying new things and
            staying ahead of the curve.
          </p>

          <a
            href="/resume.pdf"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            View My Resume (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;