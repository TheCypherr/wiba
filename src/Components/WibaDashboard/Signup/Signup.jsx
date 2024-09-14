import React from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // State for username/password and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent form from refreshing page
  };
  return (
    <section className="signup-wrapper">
      <h1>Sign up and start learning</h1>
      <div className="inner-signup">
        <h1></h1>
      </div>
    </section>
  );
};

export default Signup;
