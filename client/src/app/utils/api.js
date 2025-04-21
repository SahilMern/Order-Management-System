import axios from "axios";
import { orderUrl, productUrl } from "../helper/BackendUrl";

//TODO: - THIS API FOR FETCH PRODUCT DATA WHEN WE BUYING ANY PROJECT
export const fetchProduct = async (id) => {
  const response = await axios.get(`${productUrl}/getproduct/${id}`, {
    withCredentials: true,
  });
  return response.data?.product;
};

//TODO:- CRAETE ORDER
export const createOrder = async (orderData) => {
  const response = await axios.post(`${orderUrl}`, orderData, {
    withCredentials: true,
  });
  return response.data;
};