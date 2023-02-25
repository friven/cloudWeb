
// eslint-disable-next-line space-before-function-paren
export default function addEvent(type: string, toDo: any) {
  (window as any).addEventListener(type, toDo, false)
}
