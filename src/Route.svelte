<script>
  import {onDestroy} from 'svelte'
  import Parser from 'route-parser'
  import {location} from './location'

  export let path, component = null

  let props, current

  const unsubscribe = location.subscribe(location => {
    current = location
  })
  onDestroy(unsubscribe)

  function firstMatch(parsers, current) {
    for (const parser of parsers) {
      const params = parser.match(current)

      if (params) return params
    }

    return false
  }

  function pathList(path) {
    if (Array.isArray(path)) return path

    if (path.endsWith("*"))
      return [path, path + "any"]

    return [path]
  }

  $: {
    const {path, ...rest} = $$props
    props = rest
  }

  $: paths = pathList(path)
  $: parsers = paths.map(path => new Parser(path))
  $: params = firstMatch(parsers, current)
  $: active = !!params
</script>

{#if active}
  {#if component}
    <svelte:component this={component} {...props} {...params}/>
  {:else}
    <slot {params}/>
  {/if}
{/if}
