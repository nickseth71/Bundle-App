import { extend, Text } from "@shopify/ui-extensions/admin";

extend("admin.product-details.configuration.render", (root, { extension: {target}, i18n }) => {
  root.appendChild(
    root.createComponent(
      Text,
      {},
      i18n.translate('welcome', {target})
    )
  );
});