import { useState, useCallback } from "react";

import { API } from "aws-amplify";
import dayjs from "dayjs";


const useAPI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>()

  const sendAPICall = useCallback(async (input: {}, graphqlOp: any, setData?: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const APICallResponse: any = await API.graphql({
        query: graphqlOp,
        variables: {...input},
        authMode: 'AWS_IAM'
      });
      if (!APICallResponse.data.getSecret) {
        throw new Error("Secret not found!");
      }
      if (dayjs().utc().isBefore(APICallResponse.data.getSecret.expiration)) {
        throw new Error("secret has expired!")
      };
      setIsLoading(false);
      if (setData) setData(APICallResponse.data)
    } catch (error: any) {
      setError(error.message || 'Something went wrong!')
    }
  }, []);

  return {
    isLoading,
    error,
    sendAPICall
  };
};

export default useAPI