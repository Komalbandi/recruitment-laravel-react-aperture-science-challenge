import axios, { AxiosError, AxiosResponse } from "axios";
import { Subject, SubjectResponse } from "../../interfaces";

export class Services {
  constructor() {}

  get headers() {
    return {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json",
      "Content-Type": "application/json",
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
    };
  }
  createSubject(
    data: Subject,
    url: string
  ): Promise<AxiosResponse<string> | AxiosError> {
    return new Promise((res, rej) => {
      url = `${url}/api/subject/save`;
      axios({
        method: "post",
        url,
        data,
        withCredentials: true,
        headers: this.headers,
      })
        .then((response: AxiosResponse) => {
          res(response);
        })
        .catch((err: AxiosError) => {
          rej(err);
        });
    });
  }

  getSubject(id: number, url: string): Promise<Subject | string> {
    return new Promise((res, rej) => {
      url = `${url}/api/subject/${id}`;
      axios({
        method: "get",
        url,
        withCredentials: true,
        headers: this.headers,
      })
        .then((response: AxiosResponse<Subject>) => {
          res(response.data);
        })
        .catch((err: AxiosError) => {
          rej(err.message);
        });
    });
  }

  updateSubject(
    data: Subject,
    url: string
  ): Promise<AxiosResponse<string> | AxiosError> {
    return new Promise((res, rej) => {
      url = `${url}/api/subject/update/${data.id}`;
      axios({
        method: "post",
        url,
        data,
        withCredentials: true,
        headers: this.headers,
      })
        .then((response: AxiosResponse) => {
          res(response);
        })
        .catch((err: AxiosError) => {
          rej(err);
        });
    });
  }

  getAll(url: string): Promise<SubjectResponse | AxiosError> {
    return new Promise((res, rej) => {
      axios({
        method: "get",
        url,
        withCredentials: true,
        headers: this.headers,
      })
        .then((response: AxiosResponse<SubjectResponse>) => {
          res(response.data);
        })
        .catch((err: AxiosError) => {
          rej(err);
        });
    });
  }
}
