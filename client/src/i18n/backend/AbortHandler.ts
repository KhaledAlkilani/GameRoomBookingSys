/**
 * Handle keeping track and aborting multiple async operations with `AbortSignal`
 */
class AbortHandler {
  private controllers = new Set<AbortController>();

  /**
   * Call function while providing it with `AbortSignal`.
   *
   * ```ts
   * // Example of calling `fetch` with managed signal.
   * const result = await abortHandler.call(signal => fetch('text.txt', { signal }));
   * ```
   *
   * @param callback Function which received `AbortSignal` as an argument
   * @returns Result of the callback
   * @throws If callback throws or abort happens
   */
  async call<T>(callback: (signal: AbortSignal) => Promise<T>): Promise<T> {
    const controller = new AbortController();
    const { signal } = controller;

    this.controllers.add(controller);

    try {
      const result = await callback(signal);
      if (signal.aborted) {
        throw new Abort();
      }
      return result;
    } catch (e) {
      if (signal.aborted) {
        throw new Abort();
      }
      throw e;
    } finally {
      this.controllers.delete(controller);
    }
  }

  /**
   * Abort all currently active `AbortController` instances.
   */
  abort() {
    this.controllers.forEach(controller => controller.abort());
    this.controllers.clear();
  }
}

/**
 * `AbortHandler`'s abort exception
 */
export class Abort extends Error {
  constructor() {
    super('Abort');
  }
}

export default AbortHandler;
