import React from "react";
import styles from "styles/Home.module.css";
import Login from "containers/Login";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <Login/>
    </div>
  );
};

export default LoginPage;
