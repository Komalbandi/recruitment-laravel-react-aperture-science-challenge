import React, { useEffect, useState } from "react";
import { NextPage, NextPageContext } from "next";
import { useCookies } from "react-cookie";
import styles from "../../styles/App.module.css";
import axios from "axios";
import { parseCookies, resolveApiHost } from "../../helpers";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Subject } from "../../interfaces";

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
      axios
        .post(
          `${api}/graphql`,
          {
            query: `
              query {
                subjects {
                  id
                  name
                  test_chamber
                  date_of_birth
                  score
                  alive
                  created_at
                }
              }
            `,
          },
          { withCredentials: true }
        )
        .then((response) => {
          const { subjects = [] } = response.data?.data;
          if (subjects && subjects.length > 0) {
            return setSubjects(subjects as Subject[]);
          }
        })
        .catch((e) => {
          console.log(e);
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
  }, [authenticated]);

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
        {authenticated && (
          <button onClick={createSubject}>Create subject</button>
        )}
        <br />
        {authenticated && <button onClick={logout}>Log out</button>}
      </section>
    </Layout>
  );
}
