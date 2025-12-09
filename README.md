# **Next.js Rendering Modes — Static, Dynamic & ISR (App Router Demo)**

This project demonstrates the three core rendering strategies in the Next.js App Router: Static Rendering (SSG), Dynamic Rendering (SSR), and Hybrid Rendering (ISR). Each page in this app represents one rendering mode to clearly show the differences in performance, caching, and behavior.

---

## **Rendering Modes Overview**

### **1. Static Rendering (SSG) – `/about`**

* Pre-rendered at build time.
* No revalidation and zero server work after deployment.
* Used for content that rarely changes.
* Implemented using:

```
export const revalidate = false;
```

### **2. Dynamic Rendering (SSR) – `/dashboard`**

* Rendered fresh on every request.
* Always up-to-date because the server computes the page each time.
* Used for dashboards, real-time data, and user-specific content.
* Implemented using:

```
export const dynamic = 'force-dynamic';
```

### **3. Hybrid Rendering (ISR) – `/news`**

* Statically generated once, then regenerated every 60 seconds.
* Provides static performance with periodic freshness.
* Used for news, listings, and blogs that change occasionally.
* Implemented using:

```
export const revalidate = 60;
```

---

## **Why Each Rendering Mode Was Selected**

| Page         | Mode          | Reason                                                                                                           |
| ------------ | ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `/about`     | Static (SSG)  | Content is fixed and doesn't need re-validation. Fastest and most cost-efficient.                                |
| `/dashboard` | Dynamic (SSR) | Contains real-time server values that change on every request.                                                   |
| `/news`      | ISR           | News content updates occasionally, so revalidating every 60 seconds gives a good balance of speed and freshness. |

---

## **Caching and Revalidation Behavior**

### **Static (`/about`)**

* Cached permanently.
* No regeneration after deployment.
* Extremely fast and scalable.

### **Dynamic (`/dashboard`)**

* No caching.
* Server renders the page for every request.
* Guarantees fresh data.

### **ISR (`/news`)**

* Cached until the 60-second revalidation window ends.
* The next request after that triggers regeneration.
* Good balance between performance and updated content.

---
## **Reflection**

If the application had 10× more users:

* SSR would become expensive because each request triggers server work.
* Most pages should move to Static or ISR for better speed and lower hosting cost.
* SSR should be used only for:

  * user-specific data,
  * real-time metrics,
  * dashboards or authenticated pages.
* Static and ISR scale far better and reduce server load significantly.

---

## **Summary**

This project demonstrates:

* Static Rendering with `revalidate = false`
* Dynamic Rendering with `dynamic = 'force-dynamic'`
* Incremental Static Regeneration with `revalidate = 60`
* How caching and revalidation impact performance
* How to choose the right rendering mode for real-world apps

This completes the assignment for **Advanced Data Fetching and Rendering in the Next.js App Router**.

---

## **Environment-Aware Builds & Secret Handling**

### **Build Targets**

* `npm run build:staging` loads `.env.staging` via `dotenv-cli` before running `next build` so the bundle points at staging services.
* `npm run build:production` loads `.env.production` (also used by the default `npm run build`) ensuring production URLs are injected at build time.
* Local development keeps using Next.js defaults, automatically reading `.env.development` when `npm run dev` starts.

### **Secret Management Workflow**

* Only `.env.example` is committed; `.env.development`, `.env.staging`, and `.env.production` stay ignored to prevent accidental secret leaks.
* Real credentials live in managed secret stores (e.g. GitHub Actions secrets, AWS SSM Parameter Store, Azure Key Vault) and are injected during CI/CD pipelines rather than stored in git.
* CI jobs select the right environment file or secret scope (staging vs production) before invoking the corresponding build script.

### **Verification Checklist**

1. Populate each `.env.*` file locally from `.env.example` placeholders or load values from your secret manager at runtime.
2. Run `npm run build:staging` and confirm staging deployments reach the staging API/database targets.
3. Run `npm run build:production` and confirm the production build references production services only.

### **Why Multi-Environment Pipelines Matter**

Isolating configuration per environment keeps releases predictable: staging can surface configuration issues without risking production, and production stays locked to vetted secrets and endpoints. This separation also simplifies compliance reviews because sensitive data is never committed and every deployment documents exactly which secret source it depends on.

---

## **Understanding Cloud Deployments: Docker → CI/CD → AWS/Azure**

### **Containerizing the App**

I introduced a multi-stage `Dockerfile` that compiles the Next.js app in an isolated builder image and ships a slim runtime image. Pairing it with `.dockerignore` keeps large or sensitive files out of the build context so local caches, logs, and `.env.*` never reach the image layer.

```
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "start"]
```

### **Automating Builds with CI/CD**

GitHub Actions can orchestrate build ➜ test ➜ deploy once a branch merges. The snippet below shows the key steps: checkout, install, run the staging build (to catch config drift), and finally publish the production-ready image. Secrets like `AWS_ACCESS_KEY_ID` or `AZURE_CREDENTIALS` remain in the repository's Secret store and surface as environment variables only inside the workflow.

```yaml
name: deploy
on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build:staging
      - name: Build production image
        run: docker build -t my-app:latest .
      - name: Push to registry
        run: |
          echo "${{ secrets.REGISTRY_PASSWORD }}" | docker login ${{ secrets.REGISTRY_URL }} -u ${{ secrets.REGISTRY_USERNAME }} --password-stdin
          docker tag my-app:latest ${{ secrets.REGISTRY_URL }}/my-app:latest
          docker push ${{ secrets.REGISTRY_URL }}/my-app:latest
```

### **Deploying to AWS & Azure**

* **AWS:** Push the image to ECR, then run it on ECS Fargate or Elastic Beanstalk. Provision load balancers and networking once, then let ECS pull the latest tag on deployment.
* **Azure:** Publish the image to Azure Container Registry and hook it to Azure App Service for Containers or Azure Container Apps. App Service can auto-pull images based on deployment slots so staging and production stay isolated.

In both clouds, environment variables map through their respective service settings. When a pipeline promotes the artifact, it selects staging or production secrets accordingly.

### **Secrets & Configuration**

`dotenv-cli` and the `.env.*` convention cover local development. In the cloud, those values live in managed stores (GitHub Secrets, AWS SSM Parameter Store, Azure Key Vault) and are injected at runtime. No secret leaves those vaults or lands in git, keeping compliance auditors happy.

### **Reflection**

Learning Docker demanded the most iterations—understanding why multi-stage builds reduce attack surface was a lightbulb moment. CI/CD felt smoother once the pipeline enforced staging builds before shipping production images. Next time I want to automate infrastructure provisioning with Terraform or Bicep so environment creation is as repeatable as the builds themselves.

---