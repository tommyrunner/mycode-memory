# mycode-memory

`mycode-memory` 是一个为 Codex 设计的项目级个人编码习惯记忆 skill。

它记住的是你在具体项目中偏好的编码方式，例如注释、调试、组件拆分、文件组织和验证习惯；它不是一套常规编码规则，也不会替你生成通用规范或最佳实践。

> 当前状态：这个 skill 仍在持续进化中。记忆结构、提取方式和触发边界会根据实际使用继续调整。

## 为什么需要它

同一个用户在不同项目中可能采用不同的工作方式。随着对话和任务切换，已经确认过的个人习惯也容易丢失。

`mycode-memory` 会在每个项目内维护一份独立记忆：

```text
.mycode-memory/
  memory.md
```

Codex 在开始项目代码工作前读取这份记忆，从而延续你已经明确表达过的习惯。

## 记忆边界

### 会记录

- 用户明确表达过的个人编码偏好和工作习惯。
- 对话中已经确认的项目事实或执行结论。
- 当前项目中可以直接验证、并有助于后续工作的稳定信息。

例如：

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

`memory.md` 不能替代项目的 lint 配置、格式化配置、团队规范或架构文档。项目已有规则与个人习惯冲突时，以用户当前要求和项目现有约束为准。

## 工作模式

### 读取记忆

当你让 Codex 写代码、改代码、修 bug、重构或阅读项目时，skill 会先检查并读取：

```text
.mycode-memory/memory.md
```

如果文件不存在，会先通过初始化脚本创建模板。普通项目任务只读取并遵循记忆，不会自动改写它。

### 更新记忆

只有你明确调用 `mycode-memory` 并要求更新时，skill 才会修改记忆文件。例如：

```text
$mycode-memory 更新记忆
$mycode-memory 刷新记忆
$mycode-memory 根据当前对话更新 memory.md
```

更新时，skill 会回顾当前完整对话，将新信息与已有记忆融合，并去重、修正或替换过时内容，而不是不断在文件末尾追加记录。

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

初始化脚本会在当前工作目录创建 `.mycode-memory/memory.md`。可以在临时目录中验证：

```bash
mkdir -p /tmp/mycode-memory-test
cd /tmp/mycode-memory-test
node /path/to/mycode-memory/scripts/init-memory.js
cat .mycode-memory/memory.md
```

再次运行脚本不会覆盖已经存在的记忆文件。

## 仓库结构

```text
.
├── SKILL.md
├── agents/
│   └── openai.yaml
├── scripts/
│   └── init-memory.js
├── .gitignore
└── README.md
```

其中：

- `SKILL.md` 定义触发条件、读取流程和更新规则。
- `agents/openai.yaml` 提供 Codex 中展示和调用 skill 所需的元数据。
- `scripts/init-memory.js` 在项目内创建初始记忆模板，且不会覆盖已有文件。

## 反馈与演进

这个 skill 仍处于持续迭代阶段。实际使用中，如果出现习惯提取不准确、记忆边界不清晰、更新时机不符合预期等情况，可以通过 issue 或实际案例反馈；这些反馈会用于继续调整记忆结构和工作流程。
