export const metadata = {
  name: "Quick Start Express",
  version: "v1.0.0",
  description:
    "A simple CLI tool to generate Express servers from multiple available templates.",
  oneLineDescription: "A simple Express.js server generator CLI tool.",
};

export const commands = {
  version: {
    versionFlags: "-v, --version",
  },
  init: {
    command: "init",
    description: "Initialize a new Express server.",
  },
  clear: {
    command: "clear",
    description: "Clear the directory.",
  },
};

export const templates = {
  basic: {
    name: "basic",
    dependencies: [
      {
        name: "express",
        version: "^4.17.1",
      },
    ],
  },
};
