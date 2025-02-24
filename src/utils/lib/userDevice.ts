import { UAParser } from "ua-parser-js";

export const getUserDeviceInfo = () => {
  const parser = new UAParser();
  const result = parser.getResult();

  return {
    browser: `${result.browser.name} ${result.browser.version}`,
    os: `${result.os.name} ${result.os.version}`,
    device: result.device.model
      ? `${result.device.vendor} ${result.device.model}`
      : "Desktop",
  };
};
