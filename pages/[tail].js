import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import json from "../data.json";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_KEY } from "./api/api";
import axios from "axios";
export default function Test(props) {
  const [item, setItem] = useState({});
  const tail = useRouter().query.tail;
  const [runQuery, { called, loading, data }] = useLazyQuery(GET_KEY);

  useEffect(() => {
    runQuery({ variables: { name_tail: tail } });
  }, [tail]);

  const getItem = async () => {
    const jsonUrl = localStorage.getItem("url");

    if (jsonUrl) {
      const dataUrl = await axios.get(jsonUrl);
      if (dataUrl) {
        setItem(dataUrl.data);
      } else setItem(null);
      return;
    }
    if (data && data.set_of_keys_by_pk !== null) {
      setItem(json[data.set_of_keys_by_pk.id_tail]);
    } else setItem(null);
  };

  useEffect(() => {
    getItem();
  }, [data]);

  const ClearHistory = () => {
    document.location.replace(document.location.origin + "/");
  };
  if (!item?.title && !loading)
    return (
      <div className={styles.container}>
        <button className={styles.back} onClick={() => ClearHistory()}>
          Back
        </button>
        <div className={styles.error}>
          404
          <p>Item not found</p>
        </div>
      </div>
    );
  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => ClearHistory()}>
        Back
      </button>
      <div className={styles.block}>
        <p>{item?.title}</p>
        <p> {item?.description}</p>
      </div>
    </div>
  );
}
