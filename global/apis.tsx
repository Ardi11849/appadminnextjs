import axios from 'axios';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const url = 'http://103.175.221.43:7778/api/v1';

export function storeTokenInLocalStorage(token: string) {
  const response = NextResponse.next();
  response.cookies.set({
      name: 'token',
      value: token,
  })
  localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export const apis = async (datas: any) => {
  console.log(getTokenFromLocalStorage());

  return await axios({
    method: datas.method,
    url: url + datas.url,
    data: datas.data,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getTokenFromLocalStorage()
    }
  })
    .then((response) => {
      console.log(response);
      return response;
      // dispatch({
      //   type: GET_USER,
      //   payload: {
      //     loading:false,
      //     data: response,
      //     errorMessage: false
      //   }
      // })
    })
    .catch((err) => {
      console.log(err);
      return err;
      // dispatch({
      //   type: GET_USER,
      //   payload: {
      //     loading:false,
      //     data: err,
      //     errorMessage: false
      //   }
      // })
    })
}