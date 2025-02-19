import StackTracey from 'stacktracey';

export function parseErrorAsString(error: Error) {
  const stackTrace = new StackTracey(error).withSources().asTable();

  return error.message ? `${error.message}\n${stackTrace}` : stackTrace;
}
