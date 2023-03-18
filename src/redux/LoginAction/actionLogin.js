export const FETCH_USER_lOGIN = 'FETCH_USER_lOGIN';
export const FETCH_USER_lOGOUT = 'FETCH_USER_lOGOUT';

export function ActionLogin(res) {
  return {
    type: FETCH_USER_lOGIN,
    payload: res,
  };
}
export function ActionLogOut() {
  return {
    type: FETCH_USER_lOGOUT,
  };
}
