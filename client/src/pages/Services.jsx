// Services.jsx - services page with a short list of services and a coming soon note
// List of services; each one is displayed as a card below
const serviceList = [
  {
    title: 'Web Development',
    description: 'Simple, clean websites and portfolio pages built with HTML, CSS, JavaScript, and React.',
  },
  {
    title: 'Logo and Brand Design',
    description: 'Original logo concepts for small projects, teams, and ideas.',
  },
  {
    title: 'Forms and Small Web Tools',
    description: 'Basic interactive pages like request forms that collect and organize information.',
  },
];

function Services() {
  return (
    <section className="services">
      <h1>Services</h1>

      <div className="service-grid">
        {serviceList.map((service) => (
          <article className="service-card" key={service.title}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </article>
        ))}
      </div>

      <p className="coming-soon">More services coming soon!</p>
    </section>
  );
}

export default Services;