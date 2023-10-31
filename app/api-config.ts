import { create } from 'apisauce';

export const apiGateway = create({
  baseURL: 'https://653b84a12e42fd0d54d540b9.mockapi.io/api',
  headers: {
    "accept": 'application/json',
  }
});