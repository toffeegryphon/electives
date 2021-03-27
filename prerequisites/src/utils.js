// TODO Constants file
const FILL_PRE = '@'
const FILL_POST = '0'

export function buildCode(school, number) {
  // TODO account for longer numbers as well
  return FILL_PRE.repeat(4 - school.length) + school + number + FILL_POST.repeat(3)
}

// TODO Actually parsing should be on the back end...
export function parse(query) {
  let code = ''
  const codeArr = query.toUpperCase().replace(/\s/g, '').split(/(\d+)/)
  if (codeArr.length === 1) { // Only has school, so list all
    code = codeArr[0]
  } else {
    code = buildCode(...codeArr)
  }
  return code
}

export function buildMeta(data) {
  return {
    // Should be called total, count for current size
    count: data.count,
    next: data.next,
    previous: data.previous
  }
}

