#!/usr/bin/env node

import { program } from "commander";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import figlet from "figlet";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { metadata, commands, templates } from "./configs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const template = templates.basic;

program
  .version(metadata.version, commands.version.versionFlags)
  .description(metadata.description);

program
  .command(commands.init.command)
  .description(commands.init.description)
  .action(() => {
    toolIntro();

    console.log("Starting server initialization...");

    const targetDir = process.cwd();
    const parentDir = path.dirname(__dirname);
    const templatePath = path.join(parentDir, "templates", template.name);
    const destinationPath = path.join(targetDir);
    const npmInit = chalk.bgWhite.black("npm init");

    const initSpinner = createSpinner(`Running ${npmInit}...`).start();
    try {
      // execSync('npm init -y', { stdio: 'inherit', cwd: targetDir });
      execSync("npm init -y", { stdio: "ignore", cwd: targetDir });
      initSpinner.success({ text: `${npmInit} completed successfully.` });
    } catch (err) {
      initSpinner.error({ text: `Error running ${npmInit}:\n` });
      console.error(err.message);
      return;
    }

    //console.log(`Copying server template from ${templatePath} to ${destinationPath}`);

    const copySpinner = createSpinner("Creating server files...").start();
    try {
      fs.copySync(templatePath, destinationPath);
      copySpinner.success({ text: "Created server files successfully." });
    } catch (err) {
      copySpinner.error({ text: "Error creating server files.\n" });
      console.error(err.message);
    }

    const addDependencies = createSpinner(
      "Adding dependency packages..."
    ).start();
    try {
      // Update package.json to add express as a dependency.
      const packageJsonPath = path.join(targetDir, "package.json");
      const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
      const packageJson = JSON.parse(packageJsonContent);
      packageJson.dependencies = packageJson.dependencies || {};
      // packageJson.dependencies.express = "^4.17.1";
      template.dependencies.forEach((dependency) => {
        packageJson.dependencies[`${dependency.name}`] = dependency.version;
      });
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      addDependencies.success({
        text: "Added dependency packages successfully.",
      });
    } catch (err) {
      addDependencies.error("Error adding dependency packages.\n");
      console.error(err.message);
    }

    const installDependencies = createSpinner(
      "Installing dependency packages..."
    ).start();
    try {
      //execSync('npm i', { stdio: 'inherit', cwd: targetDir });
      execSync("npm i", { stdio: "ignore", cwd: targetDir });

      installDependencies.success({
        text: "Installed dependencies successfully.",
      });

      console.log(chalk.green.bold("\nSetup complete! To run your server:"));
      console.log(chalk.yellow("Run:"), chalk.white.bold("npm start"));
    } catch (err) {
      installDependencies.error({ text: "Error installing dependencies.\n" });
      console.error(err);
    }
  });

program
  .command(commands.clear.command)
  .description(commands.clear.description)
  .action(() => {
    const targetDir = process.cwd();
    console.log("Clearing Directory...", chalk.bgRed.white(targetDir));
    const clearingDirectory = createSpinner("Deleting All Files...").start();
    try {
      // Read the directory.
      const files = fs.readdirSync(targetDir);

      for (const file of files) {
        const filePath = path.join(targetDir, file);
        // if (file !== '.' && file !== '..') {
        fs.removeSync(filePath);
        // }
      }

      clearingDirectory.success({
        text: "Successfully cleared project directory.",
      });
    } catch (error) {
      clearingDirectory.error({ text: "Error clearing project directory" });
      console.error(error);
    }
  });

const toolIntro = () => {
  console.log(
    figlet.textSync(metadata.name, {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 90,
      whitespaceBreak: true,
    })
  );

  console.log(chalk.green.bold(metadata.oneLineDescription));
};

program.parse(process.argv);
