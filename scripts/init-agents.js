#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const agentsFile = path.join(process.cwd(), "AGENTS.md");
const templateFile = path.join(__dirname, "..", "assets", "AGENTS.template.md");

if (fs.existsSync(agentsFile)) {
  console.log(`AGENTS.md 已存在，不会覆盖：${agentsFile}`);
  process.exit(0);
}

const template = fs.readFileSync(templateFile, "utf8");
fs.writeFileSync(agentsFile, template, "utf8");
console.log(`已创建 MyCode 记忆：${agentsFile}`);
