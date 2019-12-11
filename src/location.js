import {writable} from 'svelte/store'

export const location = writable(window.location.pathname)

window.addEventListener('popstate', e => {
  e.preventDefault()
  location.update(() => window.location.pathname)
})

export function navigate(href) {
  const url = new URL(href)

  history.pushState(null, null, url.pathname)
  location.update(() => url.pathname)
}
