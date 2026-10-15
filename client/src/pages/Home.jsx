// Home.jsx - landing page with a welcome message, mission statement, and a link to the About page
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="home">
      <h1>Welcome to My Portfolio</h1>
      <p className="home-intro">
        Hi, I'm Kaelyn Johnson. Thanks for stopping by to see my work.
      </p>

      <div className="mission">
        <h2>Mission Statement</h2>
        <p>
          To build reliable, well-designed software that solves real problems,
          combining my hands-on manufacturing experience with my studies in
          artificial intelligence and software engineering.
        </p>
      </div>

      <Link to="/about" className="button">
        Learn More About Me
      </Link>
    </section>
  );
}

export default Home;