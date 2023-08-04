import Title from "../Components/atoms/Title";

const About = () => {
  return (
    <section>
      <Title
        text="Stack"
      />

      <ul className="mb-8 list-decimal list-inside">
        <li>react</li>
        <li>tailwind</li>
        <li>Appwrite</li>
        <li>zustand</li>
      </ul>
    </section>
  );
}

export default About;
