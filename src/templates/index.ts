import mit from "./MIT License";

enum License {
    MIT
};

type Generator = typeof mit;

const licenseMap: { [key in License]: Generator } = {
    [License.MIT]: mit
};

export type LicenseType = keyof typeof licenseMap;
export { License };
export default licenseMap;
