const fs = require("fs");
const path = require("path");

const servicesDir = path.join(__dirname, "src/api/services");
const outputFile = path.join(__dirname, "src/api/api.ts");

// Ensure services directory exists
if (!fs.existsSync(servicesDir)) {
  console.error(
    "Services directory not found! Run 'npm run generate-api' first."
  );
  process.exit(1);
}

// Step 1: Get all service files dynamically
const serviceFiles = fs
  .readdirSync(servicesDir)
  .filter((file) => file.endsWith(".ts"))
  .map((file) => file.replace(".ts", ""));

// Step 2: Generate imports dynamically
const imports = serviceFiles
  .map((name) => `import { ${name} } from "./services/${name}";`)
  .join("\n");

// Step 3: Create the `api` object referencing class methods
const apiObject = `export const api = {\n  ${serviceFiles
  .map(
    (name) =>
      `get${name.replace("Service", "")}: ${name}.getApi${name.replace(
        "Service",
        ""
      )},`
  )
  .join("\n  ")}\n};`;

// Step 4: Export models dynamically
const modelsDir = path.join(__dirname, "src/api/models");
const modelFiles = fs.existsSync(modelsDir)
  ? fs
      .readdirSync(modelsDir)
      .filter((file) => file.endsWith(".ts"))
      .map((file) => `export * from "./models/${file.replace(".ts", "")}";`)
      .join("\n")
  : "";

const fileContent = `${imports}\n\n${apiObject}\n\n${modelFiles}\n`;

fs.writeFileSync(outputFile, fileContent);
console.log("API wrapper generated successfully!");
