#!/usr/bin/env node
import { Command } from "commander";
import { copyComponent } from "./commands/add";

const program = new Command();

program
  .name("rn-fundamentals")
  .description("CLI to add React Native Fundamental components to your project")
  .version("1.0.0");

program
  .command("add")
  .description("Add a component to your project")
  .argument("<component>", "Component to add (Button)")
  .action(async (component) => {
    try {
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
