import PropTypes from "prop-types";

const Title = ({ text }) => {
  return (
    <h1
      className="py-3 mb-6 text-2xl font-semibold border-b"
    >
      {text}
    </h1>
  );
}

Title.propTypes = {
  text: PropTypes.string.isRequired
}

export default Title;
