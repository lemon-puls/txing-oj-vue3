declare module "json-bigint" {
  export function parse(json: string): any;

  export function stringify(value: any): string;
  export function stringify(
    value: any,
    replacer: (key: string, value: any) => any,
    space?: string | number
  ): string;
}
