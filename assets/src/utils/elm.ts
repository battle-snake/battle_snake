import { entries, map } from "./collections";

export function embedApp<T, Options>(
  tag: string,
  App: Elm.App<T, Options>,
  config?: any
): Elm.Program<T>[] {
  const elements = entries(document.querySelectorAll(tag));

  return map(elements, element => {
    const attrs = entries(element.attributes);

    let options: any = {};

    for (const a of attrs) {
      options[a.name] = a.value;
    }

    if (config) {
      Object.assign(options, config);
    }

    return Object.keys(options).length < 1
      ? App.embed(element)
      : App.embed(element, options);
  });
}
