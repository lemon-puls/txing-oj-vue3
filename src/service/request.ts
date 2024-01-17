const getToken = () => {
  let tempToken = "";
  return {
    get: () => {
      if (tempToken) {
        return tempToken;
      }
      const token = localStorage.getItem("TOKEN");
      if (token) {
        tempToken = token;
      }
      return tempToken;
    },
    clear: () => {
      tempToken = "";
    },
  };
};

export const dealToken = getToken();
