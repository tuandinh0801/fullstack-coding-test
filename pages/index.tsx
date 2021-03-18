import React, { useRef } from "react";
import Head from "next/head";
import styles from "styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { Input } from "@chakra-ui/react"

interface Ref {
  changeValue: (text: string) => void
}

const Home = () => {
  const ref = useRef<Ref>()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ref.current.changeValue(e.target.value)
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DynamicText ref={ref}/>
        <Input onChange={onChange} />
      </main>
    </div>
  );
};

export default Home;
