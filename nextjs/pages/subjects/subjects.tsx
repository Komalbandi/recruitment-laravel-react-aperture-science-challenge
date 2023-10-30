import React, { useEffect, useState, useReducer } from "react";
import { NextPage, NextPageContext } from "next";
import { useCookies } from "react-cookie";
import styles from "../../styles/App.module.css";
import axios, { AxiosError } from "axios";
import { parseCookies, resolveApiHost } from "../../helpers";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import PaginationComponent from "../../components/paginationComponent";
import { Subject, SubjectResponse, Paginiation } from "../../interfaces";
import { Services } from "./services";
import { paginationReducer } from "../../reducers/paginationReducer";

Subjects.getInitialProps = ({ req, res }: NextPageContext) => {
  const cookies = parseCookies(req);
  const { protocol, hostname } = resolveApiHost(req);
  return { XSRF_TOKEN: cookies["XSRF-TOKEN"], hostname, protocol };
};

export default function Subjects(
  props: NextPage & { XSRF_TOKEN: string; hostname: string; protocol: string }
) {
  const router = useRouter();
  const [authenticated, setAuth] = useState<Boolean>(!!props.XSRF_TOKEN);
  const [subjects, setSubjects] = useState<Array<Subject>>();
  const [message, setErrorMessage] = useState<string>("");
  const [cookie, setCookie, removeCookie] = useCookies(["XSRF-TOKEN"]);
  const api = `${props.protocol}//${props.hostname}`;
  const serverService = new Services();
  const [paginationData, setPaginationData] = useState<Paginiation | null>(
    null
  );
  const [subjectServerLink, setSubjectServerLink] = useState<string>(`${api}/api/subject/`);

  let initPagination = {
    current_page: null,
    first_page_url: null,
    from: null,
    last_page: null,
    last_page_url: null,
    next_page_url: null,
    path: null,
    per_page: null,
    prev_page_url: null,
    to: null,
    total: null,
  };

  const [paginationState, paginationDispatch] = useReducer(
    paginationReducer,
    initPagination
  );

  const logout = async () => {
    try {
      await axios({
        method: "post",
        url: `${api}/logout`,
        withCredentials: true,
      }).then((response) => {
        removeCookie("XSRF-TOKEN");
        setAuth(!(response.status === 204));
        return router.push("/");
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createSubject = async () => {
    router.push("/subjects/createSubject");
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) {
      return "???";
    }
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const editSubject = async (id: number) => {
    router.push({ pathname: "/subjects/editSubject", query: { id } });
  };

  useEffect(() => {
    if (authenticated) {
      serverService
        .getAll(subjectServerLink)
        .then((response) => {
          const subjects = (response as SubjectResponse).data;
          if (subjects && subjects.length > 0) {
            paginationDispatch({
              type: "update",
              payload: response as SubjectResponse,
            });
            console.log(subjects);
            return setSubjects(subjects as Subject[]);
          }
        })
        .catch((e: AxiosError) => {
          if (e.response?.data?.message) {
            if (e.response?.data?.message === "CSRF token mismatch.") {
              return setErrorMessage(
                "Your session has expired, please log in again."
              );
            } else {
              return setErrorMessage(e.response?.data?.message);
            }
          } else {
            return setErrorMessage(
              "An error occurred, please try again later."
            );
          }
        });
    } else {
      router.push("/");
      return;
    }
  }, [authenticated, subjectServerLink]);

  return (
    <Layout>
      <h1>Testing Subjects</h1>
      <section className={styles.content}>
        {message && <p data-testid="error-msg">{message}</p>}
        {subjects && subjects.length > 0 && (
          <table data-testid="subjects-table">
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>DOB</td>
                <td>Alive</td>
                <td>Score</td>
                <td>Test Chamber</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td>{subject.id}</td>
                  <td>{subject.name}</td>
                  <td>{formatDate(subject.date_of_birth)}</td>
                  <td>{subject.alive ? "Y" : "N"}</td>
                  <td>{subject.score}</td>
                  <td>{subject.test_chamber}</td>
                  <td>
                    <button onClick={() => editSubject(subject.id)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!subjects && !message && (
          <div className={styles.skeleton} data-testid="skeleton">
            <table>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>DOB</td>
                  <td>Alive</td>
                  <td>Score</td>
                  <td>Test Chamber</td>
                </tr>
              </thead>
              <tbody>
                {Array.from(Array(10).keys()).map((subject) => (
                  <tr key={subject}>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <PaginationComponent
          paginationState={{
            state: paginationState,
            dispatch: paginationDispatch,
          }}
          serverLink={{
            state: subjectServerLink,
            setState: setSubjectServerLink,
          }}
        />
        <br />
        {authenticated && (
          <button onClick={createSubject}>Create subject</button>
        )}
        <br />
        {authenticated && <button onClick={logout}>Log out</button>}
      </section>
    </Layout>
  );
}
