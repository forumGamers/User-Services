export default class GlobalHelper {
  public static arrayInput(input: any): any[] {
    let data = [];

    if (Array.isArray(input)) data = input;
    else if (input) data.push(input);

    return data;
  }
}
