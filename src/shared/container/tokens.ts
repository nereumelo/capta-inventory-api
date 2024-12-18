const Tokens = {
  datasource: Symbol("datasource"),
  logger: Symbol("logger"),
  availability: {
    repository: Symbol("availability-repository"),
  },
} as const;

export default Tokens;
