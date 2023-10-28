import { parseCookies, resolveApiHost, HandleError } from "../../helpers";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Layout from "../../components/layout";
import styles from "../../styles/App.module.css";
import { Subject } from "../../interfaces";
import { Services } from "./services";
import { AxiosError, AxiosResponse } from "axios";
import { validateForm } from "./common";

CreateSubject.getInitialProps = ({ req, res }: NextPageContext) => {
  const cookies = parseCookies(req);
  const { protocol, hostname } = resolveApiHost(req);
  return { XSRF_TOKEN: cookies["XSRF-TOKEN"], hostname, protocol };
};

export default function CreateSubject(
  props: NextPage & { XSRF_TOKEN: string; hostname: string; protocol: string }
) {
  const router = useRouter();
  const [authenticated, setAuth] = useState<Boolean>(!!props.XSRF_TOKEN);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [subjectData, setSubjectData] = useState<Subject>({
    id: 0,
    name: " ",
    date_of_birth: "",
    score: 0,
    test_chamber: 0,
    alive: undefined,
  });
  const handleError = new HandleError();
  const api = `${props.protocol}//${props.hostname}`;
  let serverService = new Services();

  useEffect(() => {
    if (!authenticated) {
      router.push("/");
      return;
    }
  }, [authenticated]);

  const saveSubject = (buttonEvent: React.FormEvent) => {
    buttonEvent.preventDefault();
    setErrorMessage(validateForm(subjectData));
    if (errorMessage.length === 0) {
      //save data
      serverService
        .createSubject(subjectData, `${api}`)
        .then((res) => {
          alert("Subject saved");
          router.push('/subjects/subjects');
        })
        .catch((err: AxiosError) => {
          handleError.handleServerError(err.response?.data);
        });
    }
  };

  const updateForm = (event: React.ChangeEvent<HTMLElement>) => {
    let objectKey = (event.target as HTMLInputElement).name;
    let objectValue = (event.target as HTMLInputElement).value;
    setSubjectData({
      ...subjectData,
      [objectKey]: objectValue,
    });
  };

  return (
    <Layout>
      <h1>Create subject</h1>
      <section className={styles.content}>
        {errorMessage.map((errMess, index) => (
          <p data-testid="error-msg" key={index}>
            {errMess}
          </p>
        ))}

        <form>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={subjectData["name"]}
            onChange={updateForm}
          />
          <br />
          <label htmlFor="date_of_birth">Dob:</label>
          <br />
          <input
            type="text"
            id="date_of_birth"
            name="date_of_birth"
            value={subjectData["date_of_birth"]}
            onChange={updateForm}
          />
          <br />
          <label htmlFor="test_chamber">Test chamber:</label>
          <br />
          <input
            type="text"
            id="test_chamber"
            name="test_chamber"
            value={subjectData["test_chamber"]}
            onChange={updateForm}
          />
          <br />
          <label htmlFor="alive">Alive:</label>
          <br />
          <select id="alive" name="alive" onChange={updateForm}>
            <option value="">Pick one</option>
            <option value="true">Y</option>
            <option value="false">N</option>
          </select>
          <br />
          <label htmlFor="score">Score:</label>
          <br />
          <input
            type="text"
            id="score"
            name="score"
            value={subjectData["score"]}
            onChange={updateForm}
          />
          <br />
          <button onClick={saveSubject}>Save</button>
        </form>
      </section>
    </Layout>
  );
}
