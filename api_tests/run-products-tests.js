// 1. Zaimportuj bibliotekę Newman
import { run } from "newman";

console.log("Running API tests...");

run(
  {
    collection: "./tool-shop-products-dev-tests.postman_collection.json",
    // environment: './',
    reporters: "cli",
  },
  function (err, summary) {
    if (err) {
      console.error("Error running Newman:", err);
      process.exit(1);
    }

    if (summary.run.failures.length > 0) {
      console.error("❌ API Tests Failed!");
      summary.run.failures.forEach(function (failure) {
        console.log(
          `[ERROR IN: "${failure.source.name}"] ${failure.error.message}`
        );
      });
      process.exit(1);
    } else {
      console.log("✅ All API tests have passed!");
      process.exit(0);
    }
  }
);
