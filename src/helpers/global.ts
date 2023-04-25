import { serviceResponse } from "../interfaces/service";

export default class GlobalHelper {
  public static arrayInput(input: any): any[] {
    let data = [];

    if (Array.isArray(input)) data = input;
    else if (input) data.push(input);

    return data;
  }

  public static successService(response: string): serviceResponse {
    return {
      message: response,
      status: true,
    };
  }

  public static errorService(err: any): serviceResponse {
    return {
      message: err.message || err,
      status: false,
    };
  }
}
