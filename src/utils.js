import {navigate} from './location'

export function link(node) {
  const listener = e => {
    e.preventDefault()

    navigate(e.currentTarget.href)
  }

  node.addEventListener('click', listener)

  return {
    destroy() {
      node.removeEventListener('click', listener)
    }
  }
}
