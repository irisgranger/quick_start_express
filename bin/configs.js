export const metadata = {
  name: "Quick Start Express",
  version: "v1.0.0",
  description:
    "A simple CLI tool to generate Express servers from multiple available templates.",
  oneLineDescription: "A simple Express.js server generator CLI tool.",
};

export const commands = {
  version: {
    command: "-v, --version",
    description: "Outputs program version",
  },
  init: {
    command: "init",
    description: "Initialize a new Express server.",
    options: [
      {
        flags: "-t, --template <template>",
        description: "Specify template to use",
      },
    ],
  },
  list: {
    command: "list",
    description: "List all available commands and options.",
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
  express_pg_sequelize: {
    name: "express_pg",
    dependencies: [
      {
        name: "express",
        version: "^4.17.1",
      },
      {
        name: "pg",
        version: "^8.6.0",
      },
      {
        name: "pg-hstore",
        version: "^2.3.4",
      },
      {
        name: "sequelize",
        version: "^6.6.5",
      },
      {
        name: "dotenv",
        version: "^16.4.1",
      },
    ],
  },
};
