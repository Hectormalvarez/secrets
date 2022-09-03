import { useState, useCallback } from "react";

import { API, graphqlOperation } from "aws-amplify";

const useAPI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendAPICall = useCallback(async (input: {}, graphqlOp: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const APICallResponse: any = await API.graphql(
        graphqlOperation(graphqlOp, { input })
      );
      return APICallResponse;
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