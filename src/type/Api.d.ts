interface IApiError {
  response?: {
    data?: {
      meta?: {
        message: string;
      };
    };
  };
}
