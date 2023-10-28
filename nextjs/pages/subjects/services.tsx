import axios, { AxiosError, AxiosResponse } from "axios";

export class Services {
  constructor() {}

  createSubject(data: any, url: string):Promise<AxiosResponse> {
    return new Promise((res, rej) => {
      axios
        .post(
          url,
          {
            query: `
            Subject{
                ${JSON.stringify(data)}
            }
            `,
          },
          { withCredentials: true }
        )
        .then((response:AxiosResponse) => {
          res(response);
        })
        .catch((err: AxiosError) => {
          rej(err);
        });
    });
  }
}
