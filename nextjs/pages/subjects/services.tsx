import axios, { AxiosError, AxiosResponse } from "axios";
import { Subject } from "../../interfaces";

export class Services {
  constructor() {}

  createSubject(
    data: Subject,
    url: string
  ): Promise<AxiosResponse<string> | AxiosError> {
    return new Promise((res, rej) => {
      url = `${url}/api/subject/save`;
      axios
        .post(url, data, { withCredentials: true })
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
      axios
        .get(url)
        .then((response: AxiosResponse<Subject>) => {
          res(response.data);
        })
        .catch((err: AxiosError) => {
          rej(err.message);
        });
    });
  }

  updateSubject(data: Subject,
    url: string):Promise<AxiosResponse<string> | AxiosError>{
      return new Promise((res, rej) => {
        url = `${url}/api/subject/update/${data.id}`;
        axios
          .post(url, data, { withCredentials: true })
          .then((response: AxiosResponse) => {
            res(response);
          })
          .catch((err: AxiosError) => {
            rej(err);
          });
      });
  }
}
