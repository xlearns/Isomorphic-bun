import type { Api } from "../../../server/index";
const api = new Proxy(
  {},
  {
    get(_appObject, moduleName: string) {
      return new Proxy(
        {},
        {
          get(_moduleObject, methodName: string) {
            return async (...args: any) => {
              const servePath: string = import.meta.env.VITE_API_URL;
              const url = `${servePath}/${moduleName}/${methodName}`;
              const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(args),
              });
              return res.json();
            };
          },
        }
      );
    },
  }
);
export default api as Api;
