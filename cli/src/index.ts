#!/usr/bin/env node
import { Command } from "commander";
import { copyComponent } from "./commands/add";

const AVAILABLE_COMPONENTS = [
  "Button",
  "Text",
  "TextInput",
  "SegmentedControl",
  "View",
  "SafeAreaView",
];

const program = new Command();

program
  .name("rn-fundamentals")
  .description("CLI to add React Native Fundamental components to your project")
  .version("1.0.0");

program
  .command("add")
  .description(
    `Add a component to your project. Available components: ${AVAILABLE_COMPONENTS.join(
      ", ",
    )}`,
  )
  .argument("<component>", "Name of the component to add")
  .action(async (component) => {
    try {
      if (!AVAILABLE_COMPONENTS.includes(component)) {
        throw new Error(
          `Invalid component. Available components: ${AVAILABLE_COMPONENTS.join(
            ", ",
          )}`,
        );
      }
      await copyComponent(component);
      console.log(`✅ Successfully added ${component} component`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("❌ Error:", errorMessage);
      process.exit(1);
    }
  });

program.parse();
