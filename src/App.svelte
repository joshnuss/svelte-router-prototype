<script>
  import Route from './Route.svelte'
  import {link} from './utils'
  import {location} from './location'

  import Cart from './Cart.svelte'
</script>

<main>
  <Route path="/">
    <h1>Home</h1>

    <a href="/products" use:link>Products</a>
    <a href="/products/foo" use:link>FOO</a>
    <a href="/cart" use:link>Cart</a>
  </Route>

  <Route path="/pages/*name" let:params>
    <h1>Page: {params.name}</h1>
  </Route>

  <Route path="/category/:parent(/:child)" let:params>
    <h1>Category: {params.parent}</h1>
    {#if params.child}
      <h2>Child: {params.child}</h2>
    {/if}
  </Route>

  <Route path="/products/*">
    <h1>Products</h1>

    <Route path="/products/:id" let:params>
      <h2>Product: {params.id}</h2>
    </Route>
  </Route>

  <Route path="/cart" component={Cart} a=1 b=2/>
</main>
