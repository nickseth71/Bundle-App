// @ts-check

/*
A straightforward example of a function that expands a bundle into its component parts.
The parts of a bundle are stored in a metafield on the product parent value with a specific format,
specifying each part's quantity and variant.

The function reads the cart. Any item containing the metafield that specifies the bundle parts
will return an Expand operation containing the parts.
*/

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 * @typedef {import("../generated/api").CartOperation} CartOperation
 */

/**
 * @type {FunctionResult}
 */
const NO_CHANGES = {
  operations: [],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {

  const operations = input.cart.lines.reduce(
    /** @param {CartOperation[]} acc */

    (acc, cartLine) => {
      const expandOperation = optionallyBuildExpandOperation(cartLine);

      if (expandOperation) {
        return [...acc, { expand: expandOperation }];
      }

      return acc;
    },
    []
  );

  return operations.length > 0 ? { operations } : NO_CHANGES;
};

function optionallyBuildExpandOperation({ id: cartLineId, merchandise }) {
  console.log('cartLineId ',cartLineId);
  console.log('merchandise ',merchandise.__typename);
  const hasExpandMetafields =
    !!merchandise.component_quantities && !!merchandise.component_reference;
  console.log('hasExpandMetafields ',hasExpandMetafields);
  console.log('price_adjustments ',merchandise.price_adjustments.value);
  if (hasExpandMetafields) {
    const component_reference = JSON.parse(
      merchandise.component_reference.value
    );
    const component_quantities = JSON.parse(
      merchandise.component_quantities.value
    );

    if (
      component_reference.length !== component_quantities.length ||
      component_reference.length === 0
    ) {
      throw new Error("Invalid bundle composition");
    }

    const expandedCartItems = component_reference.map(
      (merchandiseId, index) => ({
        merchandiseId: merchandiseId,
        quantity: component_quantities[index],
      })
    );

    if (expandedCartItems.length > 0) {
      return { cartLineId, expandedCartItems, price: { percentageDecrease: { value: merchandise.price_adjustments.value} } };
    }
  }

  return null;
}