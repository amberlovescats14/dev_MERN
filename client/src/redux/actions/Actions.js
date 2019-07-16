import uuid from 'uuid'
import axios from 'axios'
import setAuthToken from '../../util/setAuthToken'


export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: 'SET_ALERT',
    payload: {msg, alertType, id}
  });
  setTimeout(()=>  dispatch({
    type: `REMOVE_ALERT`,
    payload: id
  }), timeout)
}
//THIS IS WHAT its going to look like
//   {
//     id: 1,
//     msg:`Passwords donnot match`,
//     alertType: `Danger`
//   }

//!AUTH
// REGISTER_SUCCESS 
// REGISTER_FAIL
export const authFunc = ({name, email, password}) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({name, email, password})
    try {
      const res = await axios.post('/api/users', body, config)

      dispatch({
        type: `REGISTER_SUCCESS`,
        payload: res.data
      })
    } catch (err) {
      const errors = err.response.data.errors;
      if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      }

      dispatch({
        type: `REGISTER_FAIL`
      })
    }

}

//!actions AUTH
export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/api/auth')

    dispatch({
      type: `USER_LOADED`,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: `AUTH_ERROR`
    })
  }
}


