# 宝可梦工具 (Pokémon Utility)

一个基于 Tauri 和 React 的宝可梦工具应用，用于团战策略分析、地图事件标记、宝可梦信息管理和食材对照等功能。

## 功能特性

- **团战助手**: 分析宝可梦属性克制关系，记录团战历史
- **地图事件**: 在地图上标记重要事件位置
- **宝可梦信息**: 管理宝可梦技能类型和注意事项
- **食材对照**: 查看属性与食材的对应关系

## 优化内容

- 优化了组件性能，使用 `useCallback` 和 `useMemo` 减少不必要的渲染
- 改进了状态管理，使用更清晰的变量名和逻辑
- 添加了错误处理和加载状态，提升用户体验
- 优化了文件系统操作，加入了缓存机制
- 改进了 UI/UX 设计，使用 Ant Design 最佳实践
- 添加了表单验证和边界情况处理

## 技术栈

- [Tauri](https://tauri.app/) - 跨平台桌面应用框架
- [React](https://reactjs.org/) - 前端框架
- [Ant Design](https://ant.design/) - UI 组件库
- [Vite](https://vitejs.dev/) - 构建工具

## 开发环境要求

- Node.js 18+
- Rust (用于 Tauri)

## 安装与运行

```bash
# 安装依赖
npm install

# 开发模式运行
npm run tauri dev

# 构建应用
npm run tauri build
```

## 推荐 IDE 设置

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/jsxbcmz/tauri-pkm-utils?utm_source=oss&utm_medium=github&utm_campaign=jsxbcmz%2Ftauri-pkm-utils&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)