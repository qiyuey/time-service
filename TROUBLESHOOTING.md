# Troubleshooting Guide

## npm Publish Issues

### 503 Service Unavailable Error

**症状**：
```
npm error code E503
npm error 503 Service Unavailable - PUT https://registry.npmjs.org/@qiyuey%2ftime-service
```

**原因**：
npm registry 临时性服务中断或负载过高。

**解决方案**：

#### 1. 使用自动重试（推荐）

项目已配置自动重试机制（3次尝试，每次间隔30秒）。通常会自动解决问题。

#### 2. 手动触发重新发布

如果 GitHub Actions 失败：

```bash
# 在本地重新打标签并推送
git tag -d v0.3.0                    # 删除本地标签
git push origin :refs/tags/v0.3.0    # 删除远程标签
git tag v0.3.0                        # 重新创建标签
git push origin v0.3.0               # 推送触发 Actions
```

#### 3. 手动发布到 npm

如果 Actions 持续失败：

```bash
# 1. 确保已登录 npm
npm login

# 2. 检查版本号
npm version

# 3. 发布包
npm publish --access public

# 或使用 Bun
bun publish --access public
```

#### 4. 检查 npm 服务状态

访问 [npm status page](https://status.npmjs.org/) 确认服务是否正常。

#### 5. 使用备用 workflow

项目提供了两个 workflow：
- `publish.yml` - 主要发布流程（带 provenance）
- `publish-fallback.yml` - 备用流程（不带 provenance，更可靠）

可以临时禁用主 workflow，启用备用 workflow。

### 401 Unauthorized Error

**症状**：
```
npm error code E401
npm error 401 Unauthorized
```

**原因**：
npm token 过期或无效。

**解决方案**：

1. 在 [npmjs.com](https://www.npmjs.com/) 生成新的 access token
   - 访问 Settings > Access Tokens
   - 选择 "Automation" 类型（用于 CI/CD）
   - 复制 token

2. 更新 GitHub repository secrets
   - 访问 GitHub repo > Settings > Secrets and variables > Actions
   - 更新 `NPM_TOKEN` 的值

3. 重新触发发布

### 429 Too Many Requests

**症状**：
```
npm error code E429
npm error 429 Too Many Requests
```

**原因**：
短时间内发布请求过多。

**解决方案**：

等待 15-60 分钟后重试。

### EPUBLISHCONFLICT (版本已存在)

**症状**：
```
npm error code EPUBLISHCONFLICT
npm error You cannot publish over the previously published versions
```

**原因**：
该版本号已经发布过了。

**解决方案**：

1. 检查当前版本：
```bash
npm view @qiyuey/time-service version
```

2. 更新版本号：
```bash
npm version patch  # 或 minor/major
git push && git push --tags
```

## GitHub Actions Issues

### Workflow 不触发

**检查清单**：
- ✓ 标签格式正确（`v*`）
- ✓ Workflow 文件存在于 `.github/workflows/`
- ✓ Workflow 已启用（Actions tab）
- ✓ 有正确的权限

### Secrets 未设置

**检查**：
- 在 GitHub repo Settings > Secrets 中确认 `NPM_TOKEN` 已设置
- Token 具有发布权限

## 测试相关问题

### 测试失败导致无法发布

**临时解决**：

workflow 中测试步骤设置了 `continue-on-error: true`，不会阻止发布。

**长期解决**：

修复测试问题，确保代码质量。

## 网络问题

### 超时错误

如果遇到网络超时：

```bash
# 增加 npm 超时时间
npm config set timeout 300000

# 或使用国内镜像（仅用于安装，发布仍需官方源）
npm config set registry https://registry.npmmirror.com
```

**注意**：发布时必须使用官方 registry！

## 获取帮助

如果问题持续存在：

1. 查看 [npm status](https://status.npmjs.org/)
2. 查看 GitHub Actions 完整日志
3. 在项目 [Issues](https://github.com/qiyuey/time-service/issues) 中报告

## 成功发布的标志

✅ GitHub Actions workflow 成功完成
✅ npm registry 上可以看到新版本：`npm view @qiyuey/time-service`
✅ GitHub Releases 页面创建了新 release
✅ 可以通过 `npx @qiyuey/time-service@latest` 安装最新版本
