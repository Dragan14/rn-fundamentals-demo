import fs from "fs-extra";
import path from "path";

const TEMPLATES_DIR = path.join(__dirname, "../../templates");

export async function copyComponent(componentName: string) {
  const componentDir = path.join(process.cwd(), "components");

  if (!["Button"].includes(componentName)) {
    throw new Error(`Component ${componentName} is not available`);
  }

  // Ensure the components directory exists
  await fs.ensureDir(componentDir);

  // Copy the component file
  await fs.copy(
    path.join(TEMPLATES_DIR, `${componentName}.tsx`),
    path.join(componentDir, `${componentName}.tsx`),
  );
}
