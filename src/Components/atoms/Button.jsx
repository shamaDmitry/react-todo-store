import PropTypes from "prop-types";

const Button = ({ label, onClick, className }) => {
  return (
    <button
      className={`px-3 py-1 border ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default Button;
