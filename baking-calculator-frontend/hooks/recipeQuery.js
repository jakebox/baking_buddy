import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

// import API_URL from "../constants";
import { decode as atob } from "base-64";

import queryClient from "../components/queryClient";

// TEMP
const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphY29iIiwidXNlcklkIjoiNjVhMTdmYjk2ZTdiMGViMzRlYmE4ODhkIiwiaWF0IjoxNzE4NTczMzE3LCJleHAiOjE3MTg1OTQ5MTd9.zZwUfwFTS7h95PGSi-X21jtx3yaNn1-xA_cAKqbHKy0";

const API_URL = "http://localhost:8000";

const decodeJwt = (token) => {
  return JSON.parse(atob(token.split(".")[1]));
};

const fetchRecipes = async () => {
  try {
    const userId = decodeJwt(jwtToken).userId;
    const url = API_URL + "/users/" + userId + "/recipes/";
    console.log("Fetching data from", url);
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data");
    throw error;
  }
};

export const patchRecipe = async (data, recipe_id) => {
  try {
    const userId = decodeJwt(jwtToken).userId;
    const url = API_URL + "/users/" + userId + "/recipes/" + recipe_id;
    console.log("Posting recipe to ", url);
    const response = await axios.patch(url, data, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    queryClient.invalidateQueries("recipes");
    return response.data
  } catch (error) {
    console.error("Error posting data");
    throw error;
  }
};

export const UseRecipeData = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  return { isLoading, data, error };
};


  // const mut = useMutation({
  //   queryFn: patchRecipe,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("recipes");
  //   },
  // });