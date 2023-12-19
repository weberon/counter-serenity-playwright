import { useState } from "react";

const InputBox = () => {
  const [value, setValue] = useState(0);

  const onChange = (e) => setValue(e.target.value);

  return (
    <div className="input-container">
      <form>
        <input
          type="text"
          name="example"
          id="example"
          value={value}
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default InputBox;
