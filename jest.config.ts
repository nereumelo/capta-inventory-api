import type { JestConfigWithTsJest } from 'ts-jest';

/**
 * @see https://jestjs.io/docs/configuration
 * Jest configuration file
 * @type {import("ts-jest").JestConfigWithTsJest}
 */
const config: JestConfigWithTsJest = {
    preset: 'ts-jest',
    collectCoverage: false,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
};

export default config;
