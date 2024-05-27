let om_ = {
  createStruct: (...args: string[]): string => {
    return args.join(':')
  },
  createEvent: (name: string | string[], cb = {}): any => {
    if (typeof name != 'string') name = om_.createStruct(...name)
    if (typeof name != 'string') return;

    let ev = new CustomEvent(name, {
      detail: cb,
    })

    return ev
  },
  $: (name: string | string[], cb?: object): boolean => {
    let ev = om_.createEvent(name, cb)
    return dispatchEvent(ev)
  },
  _: (name: string | string[], cb: EventListenerOrEventListenerObject): boolean => {
    if (typeof name != 'string') name = om_.createStruct(...name)
    if (typeof name != 'string') return false;
    
    let el = addEventListener(name, cb)
    return true
  },
}

export default om_