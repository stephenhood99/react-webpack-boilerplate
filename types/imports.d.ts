declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.less' {
  const classNameMap: { [key: string]: string };
  export default classNameMap;
}