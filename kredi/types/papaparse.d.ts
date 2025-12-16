declare module 'papaparse' {
  function parse<T>(csv: string, config?: ParseConfig): ParseResult<T>;
  function parse(file: File | Blob, config?: ParseConfig): ParseResult<any>; // Add overload for File/Blob if needed

  interface ParseConfig {
    delimiter?: string;
    header?: boolean;
    dynamicTyping?: boolean | ((field: string) => boolean);
    preview?: number;
    encoding?: string;
    worker?: boolean;
    comments?: boolean | string;
    step?: (results: ParseResult<any>, parser: any) => void;
    complete?: (results: ParseResult<any>, file: File) => void;
    error?: (error: ParseError, file: File) => void;
    download?: boolean;
    fastMode?: boolean;
    skipEmptyLines?: boolean | 'greedy';
    chunk?: (results: ParseResult<any>, parser: any) => void;
    transform?: (value: any, field: string | number) => any;
    beforeFirstChunk?: (chunk: string) => string | void;
    withCredentials?: boolean;
    // Add other relevant options if needed
  }

  interface ParseResult<T> {
    data: T[];
    errors: ParseError[];
    meta: ParseMeta;
  }

  interface ParseError {
    type: string;
    code: string;
    message: string;
    row: number;
  }

  interface ParseMeta {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
    fields?: string[];
  }

  // If other exports like Papa.unparse are used, they also need to be declared.
  function unparse(data: any[] | object, config?: UnparseConfig): string;
  function unparse(data: any[], config?: UnparseConfig): string;

  interface UnparseConfig {
    quotes?: boolean | boolean[] | ((value: any, field: string) => boolean);
    delimiter?: string;
    header?: boolean;
    newline?: string;
  }
}
