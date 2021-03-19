import React from "react";
import styles from "styles/Home.module.css";
import SignUp from "containers/SignUp";

const Home = () => {
  return (
    <div className={styles.container}>
      <SignUp />
    </div>
  );
};

export default Home;
