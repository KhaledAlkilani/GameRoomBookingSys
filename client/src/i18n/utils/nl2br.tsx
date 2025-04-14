import { ReactNode, cloneElement } from 'react';

/**
 * Convert newlines into `<br>` elements.
 *
 * @param text Text to process.
 * @param newline Newline separator. Default: `"\n"`.
 * @param element Element used to join lines. Default: `<br/>`.
 * @returns Array of `ReactNode`s
 */
const nl2br = (
  text: string,
  newline: string | RegExp = '\n',
  element?: Parameters<typeof cloneElement>[0],
) => {
  const parts = text.split(newline);
  const result: ReactNode[] = [parts[0]];

  for (let i = 1; i < parts.length; i++) {
    // Inject key
    const newlineElement =
      element !== undefined ? (
        cloneElement(element, { key: i })
      ) : (
        <br key={i} />
      );

    result.push(newlineElement, parts[i]);
  }

  return result;
};

export default nl2br;
