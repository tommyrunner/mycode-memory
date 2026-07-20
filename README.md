# mycode-memory

`mycode-memory` 是一个为 Codex 设计的项目级个人编码习惯记忆 skill。

它记住的是你在具体项目中偏好的编码方式，例如注释、调试、组件拆分、文件组织和验证习惯；它不是一套常规编码规则，也不会替你生成通用规范或最佳实践。

> 当前状态：这个 skill 仍在持续进化中。记忆结构、提取方式和触发边界会根据实际使用继续调整。

## 为什么需要它

同一个用户在不同项目中可能采用不同的工作方式。随着对话和任务切换，已经确认过的个人习惯也容易丢失。

`mycode-memory` 直接使用每个项目根目录的 Codex 指令文件承载记忆：

```text
AGENTS.md
```

只要请求最终需要变更项目代码或相关配置，Codex 就会在任务开始时自动获得 `AGENTS.md` 中的指令；skill 只负责确保这个载体存在，并在缺失时初始化模板。

## 记忆边界

### 会记录

- 用户明确表达过的个人编码偏好和工作习惯。
- 对话中已经确认的项目事实或执行结论。
- 当前项目中可以直接验证、并有助于后续工作的稳定信息。

例如：

- 你希望 Codex 如何称呼自己，默认称呼为“小C”。
- 你希望注释写到什么程度。
- 你习惯如何打印和调试。
- 你希望界面组件如何拆分和分层。
- 你偏好的文件组织方式。
- 你通常要求执行哪些测试或验证。

### 不会记录

- 与用户习惯无关的通用编码规范或最佳实践。
- 没有对话依据或项目证据的推测。
- 密钥、token、密码、私钥及其他敏感信息。
- 只对一次临时任务有用、无法复用的上下文。

`AGENTS.md` 不能替代项目的 lint 配置、格式化配置或架构文档。项目已有规则与个人习惯冲突时，以用户当前要求和项目现有约束为准。

## 工作模式

### 使用记忆

当你让 Codex 写代码、改代码、删除代码、修 bug、重构、优化、调整配置或文件结构时，skill 会隐式触发并首先检查：

```text
AGENTS.md
```

如果项目根目录已经存在该文件，Codex 会在任务开始前自动加载，skill 不再重复读取。如果不存在，会先通过初始化脚本创建原有记忆模板，并在当前任务中读取一次使其立即生效。普通项目任务不会改写已有文件；纯知识问答或不涉及项目变更的讨论不会触发。

### 更新记忆

只有你明确调用 `mycode-memory` 并要求更新时，skill 才会修改记忆文件。例如：

```text
$mycode-memory 更新记忆
$mycode-memory 刷新记忆
$mycode-memory 根据当前对话更新 AGENTS.md
```

更新时，skill 会回顾当前完整对话，将新信息与 `AGENTS.md` 中的 `MyCode Memory` 部分融合，并去重、修正或替换过时内容，而不是不断在文件末尾追加记录。已有的其他项目说明会保持不变。

称呼保存在 `称呼` 模块中，默认使用“小C”。每个新对话的首次回复、普通问候、称呼提问和任务执行都会使用当前称呼。这个称呼是个性化昵称，不替代 Codex 的产品身份；当用户问“你叫什么”时，Codex 应回答“你可以叫我小C”，而不是只回答“我叫 Codex”。用户明确指定新称呼后，下次刷新记忆会直接替换旧值并立即使用。

Codex 每个运行会话只在开始时自动加载一次 `AGENTS.md`。修改或刷新称呼后，应新建一个 Codex 任务验证新对话首答；当前刷新流程会主动读取文件，因此本轮后续回复可以立即使用新称呼。

仅仅在普通对话中提到编码习惯，不会触发记忆写入。

## 安装

获取仓库：

```bash
git clone <repository-url> mycode-memory
cd mycode-memory
```

安装到 Codex skills 目录：

```bash
mkdir -p ~/.codex/skills/mycode-memory
cp -R SKILL.md agents scripts ~/.codex/skills/mycode-memory/
```

安装完成后，新开一个 Codex 对话以重新加载 skills。

## 本地测试

初始化脚本会在当前工作目录创建 `AGENTS.md`。可以在临时目录中验证：

```bash
mkdir -p /tmp/mycode-memory-test
cd /tmp/mycode-memory-test
node /path/to/mycode-memory/scripts/init-agents.js
cat AGENTS.md
```

再次运行脚本不会覆盖已经存在的记忆文件。

## 仓库结构

```text
.
├── SKILL.md
├── agents/
│   └── openai.yaml
├── scripts/
│   └── init-agents.js
├── .gitignore
└── README.md
```

其中：

- `SKILL.md` 定义触发条件、初始化流程和更新规则。
- `agents/openai.yaml` 提供 Codex 中展示和调用 skill 所需的元数据。
- `scripts/init-agents.js` 在项目根目录创建初始 `AGENTS.md` 记忆模板，且不会覆盖已有文件。

## 反馈与演进

这个 skill 仍处于持续迭代阶段。实际使用中，如果出现习惯提取不准确、记忆边界不清晰、更新时机不符合预期等情况，可以通过 issue 或实际案例反馈；这些反馈会用于继续调整记忆结构和工作流程。
