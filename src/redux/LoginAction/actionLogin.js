export const FETCH_USER_lOGIN = "FETCH_USER_lOGIN";

function ActionLogin(res) {
  return {
    type: FETCH_USER_lOGIN,
    payload: res,
  };
}

export default ActionLogin;
