const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
}) => {
  return (
    <label
      style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}
    >
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginTop: "5px",
        }}
      />
    </label>
  );
};

export default FormInput;
