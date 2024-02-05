export default function startViewTransition(callback: () => void) {
  // @ts-ignore
  if (document.startViewTransition) {
    // @ts-ignore
    document.startViewTransition(() => callback())
  } else {
    callback();
  }
}