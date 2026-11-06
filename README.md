# lv-star-site

[lv-star.top](https://lv-star.top) 的源码。纯静态，没有构建步骤，没有框架。

```
.
├── index.html        # 全部内容都在这里
├── 404.html          # 404 页面
├── favicon.svg       # 标签页图标
├── _headers          # Cloudflare Pages 响应头（安全 + 缓存策略）
└── assets/
    ├── style.css     # 样式；顶部两组 CSS 变量控制浅色/深色配色
    ├── main.js       # 主题切换、滚动入场、年份
    └── avatar.png    # 头像
```

## 在线

- 主站：<https://lv-star.top>
- 备用：<https://lv-star.pages.dev>

## 本地预览

不需要装任何东西，任何静态服务器都行：

```powershell
node ../../Sites/_preview.mjs 5180 .
```

或者直接双击 `index.html`。

## 修改

内容全部在 `index.html`，配色在 `assets/style.css` 顶部的 `:root` 与 `:root[data-theme="dark"]` 两组变量里。

改完提交，然后发布：

```powershell
wrangler pages deploy . --project-name=lv-star --branch=main
```

## 技术说明

- 无依赖、无构建产物，浏览器直接跑
- 明暗主题跟随系统，手动切换后记在 `localStorage`
- 响应式，360 / 430 / 768 / 1280 均无横向溢出
- SEO：`description`、Open Graph、JSON-LD `Person`
- 无障碍：跳转链接、`aria-label`、`:focus-visible`、尊重 `prefers-reduced-motion`
