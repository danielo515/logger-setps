// @flow
const levels = [`error`, `warn`, `log`, `info`, `debug`];

type iTracer = {
    flush(): void,
    warn(): void
};
type Step = {
    title: string;
    details?: any;
};


/**
 * Returns an object with the same interface the Logger has.
 * The difference is that instead of inmediatelly send the log messages to the
 * target output, messages are collected into a trace and then otputed all at the
 * same time when a trace flush is triggered.
 * You should peform a flush when you finish the trace, but in case you don't do
 * an automatic flush is peformed after a configurable timeout.
 * Please note that you should allways call the flush method.
 * Not doing it and relying to the automatic flush could cause unexpected behaviors and performance problems.
 *
 * @param {any} logger  the logger to use to flush the trace
 * @param {number} secs the number of seconds before triggering  an automatic flush
 * @return {Object} tracer - the tracer object containing the usual methods the logger has
 * @return {function} tracer.flush - sends the complete trace to the provided logger
*/
const tracer = function (logger: any, tracename: string = `Steps`, secs: number = 30) {
  secs = typeof secs === `number` ? secs : 30;
  let levelName:string = `debug`;
  let level:number = 4;
  const steps: Array<Step | string> = [`${tracename  }: \n`];
  const API = {};
  let flushTimeout:number = resetFlushTimeout();

    /**
     * Flushes the current trace to the logger.
     * If this is an automatic flush, it adds a warning to the trace because this should never happen
    */
  function flush (isAutomaticFlush: boolean) {

    if (isAutomaticFlush) {
      API.warn(`Automatic trace flush`, `This usually means an error on the process using the trace or a bad trace-API usage`);
    }
    logger[levelName].apply(logger, steps);
    clearTimeout(flushTimeout);
  }

  function resetFlushTimeout (): number {

    flushTimeout && clearTimeout(flushTimeout);
    flushTimeout = setTimeout(flush, secs * 1000, true);
    return flushTimeout;
  }

    /**
     * Registers a log message in the trace.
     * If the logging level has more priority than the current one (lower name)
     * then the whole trace level is set to that logging level
     */
  const handleLogMessage = (lvlName: string , lvl: number, title: string, ...rest) => {
    const step: Step = {title};
    if (rest.length > 0) {
      step.details = rest.length === 1 ? rest[0] : rest;
    }
    steps.push(step);
    if (lvl < level) {
      level = lvl;
      levelName = lvlName;
    }
    resetFlushTimeout();
  };

    /**
     * We bind flush to false so whatever is passed is ignored and
     * we do not erroneous flag the flush as automatic*/
  API.flush = flush.bind(API, false);
    /**
     * Build the rest of the API interface
    */
  return levels.reduce(
        (api, name, lvl) => {
          api[name] = handleLogMessage.bind(api, name, lvl);
          return api;
        }, API);
};

export default tracer;
