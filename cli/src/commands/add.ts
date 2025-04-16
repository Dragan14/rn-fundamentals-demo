import fs from "fs-extra";
import path from "path";

const TEMPLATES_DIR = path.join(__dirname, "../../../components");

export async function copyComponent(componentName: string) {
  if (componentName === "theme") {
    // Handle theme files
    const contextDir = path.join(process.cwd(), "context");
    const themeDir = path.join(process.cwd(), "");

    // Ensure directories exist
    await fs.ensureDir(contextDir);
    await fs.ensureDir(themeDir);

    // Copy theme context
    await fs.copy(
      path.join(TEMPLATES_DIR, "ThemeContext.tsx"),
      path.join(contextDir, "ThemeContext.tsx"),
    );

    // Copy theme files
    await fs.copy(
      path.join(TEMPLATES_DIR, "blue-theme.json"),
      path.join(themeDir, "blue-theme.json"),
    );
    return;
  }

  const componentDir = path.join(process.cwd(), "components", "ui");

  if (
    ![
      "Button",
      "Text",
      "TextInput",
      "SegmentedControl",
      "View",
      "SafeAreaView",
    ].includes(componentName)
  ) {
    throw new Error(`Component ${componentName} is not available`);
  }

  // Ensure the components/ui directory exists
  await fs.ensureDir(componentDir);

  // Copy the component file
  await fs.copy(
    path.join(TEMPLATES_DIR, `${componentName}.tsx`),
    path.join(componentDir, `${componentName}.tsx`),
  );
}
