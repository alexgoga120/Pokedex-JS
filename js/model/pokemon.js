function makePokemon(pokemon) {
  return {
    'id': pokemon.id,
    'name': pokemon.name,
    'types': pokemon.types,
    'weight': pokemon.weight,
    'height': pokemon.height,
    'front': pokemon.sprites.front_default,
    'back': pokemon.sprites.back_default,
    'shiny_front': pokemon.sprites.front_shiny,
    'shiny_back': pokemon.sprites.back_shiny,
  };
}
